import { Colors } from '@/constants/Colors';
import * as schema from '@/db/schema';
import { Ionicons } from '@expo/vector-icons';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useMemo } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
    const db = useSQLiteContext();
    const drizzleDb = useMemo(() => drizzle(db, { schema }), [db]);

    // Fetch all tasks
    const { data: todos } = useLiveQuery(
        drizzleDb.select().from(schema.todos)
    );

    const stats = useMemo(() => {
        if (!todos) return null;

        const total = todos.length;
        const completed = todos.filter(t => t.completed === 1).length;
        const pending = total - completed;
        const completionRate = total > 0 ? (completed / total) : 0;

        // Weekly Progress (Last 7 Days based on due_date)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        const weeklyData = last7Days.map(dateStr => {
            const tasksForDay = todos.filter(t => t.due_date === dateStr);
            const completedForDay = tasksForDay.filter(t => t.completed === 1).length;
            return completedForDay;
        });

        // Priority Breakdown (Completed)
        const highPriority = todos.filter(t => t.priority === 1 && t.completed === 1).length;
        const medPriority = todos.filter(t => t.priority === 2 && t.completed === 1).length;
        const lowPriority = todos.filter(t => t.priority === 3 && t.completed === 1).length;

        return {
            total,
            completed,
            pending,
            completionRate,
            weeklyData,
            daysLabels: last7Days.map(d => {
                const date = new Date(d);
                return `${date.getDate()}/${date.getMonth() + 1}`;
            }),
            priorities: { high: highPriority, medium: medPriority, low: lowPriority }
        };
    }, [todos]);

    if (!stats) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading Analytics...</Text>
            </View>
        );
    }

    const chartConfig = {
        backgroundGradientFrom: Colors.surface,
        backgroundGradientTo: Colors.surface,
        color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`, // Primary colorish
        strokeWidth: 2,
        barPercentage: 0.5,
        decimalPlaces: 0,
        labelColor: (opacity = 1) => Colors.text,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: Colors.primary
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
            <Text style={styles.headerTitle}>Analytics</Text>

            {/* Summary Cards */}
            <View style={styles.summaryContainer}>
                <View style={styles.card}>
                    <Ionicons name="checkmark-circle" size={24} color={Colors.green} />
                    <Text style={styles.cardValue}>{stats.completed}</Text>
                    <Text style={styles.cardLabel}>Completed</Text>
                </View>
                <View style={styles.card}>
                    <Ionicons name="hourglass" size={24} color={Colors.yellow} />
                    <Text style={styles.cardValue}>{stats.pending}</Text>
                    <Text style={styles.cardLabel}>Pending</Text>
                </View>
                <View style={styles.card}>
                    <Ionicons name="trending-up" size={24} color={Colors.blue} />
                    <Text style={styles.cardValue}>{Math.round(stats.completionRate * 100)}%</Text>
                    <Text style={styles.cardLabel}>Rate</Text>
                </View>
            </View>

            {/* Weekly Chart */}
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Last 7 Days (Completed)</Text>
                <BarChart
                    data={{
                        labels: stats.daysLabels,
                        datasets: [
                            {
                                data: stats.weeklyData
                            }
                        ]
                    }}
                    width={screenWidth - 40}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={chartConfig}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                    showValuesOnTopOfBars
                />
            </View>

            {/* Completion Progress Chart */}
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Completion Rate</Text>
                <ProgressChart
                    data={{
                        labels: ["Done"], // optional
                        data: [stats.completionRate]
                    }}
                    width={screenWidth - 40}
                    height={220}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={{
                        ...chartConfig,
                        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                    }}
                    hideLegend={false}
                    style={{
                        borderRadius: 16
                    }}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
        paddingTop: 60,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 20,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 15,
        alignItems: 'center',
        width: '30%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.text,
        marginTop: 5,
    },
    cardLabel: {
        fontSize: 12,
        color: Colors.text,
        opacity: 0.7,
    },
    chartContainer: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 20,
        color: Colors.text,
        textAlign: 'center',
        marginTop: 50
    }
});
