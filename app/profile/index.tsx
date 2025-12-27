import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    const menuItems = [
        {
            title: 'Account',
            items: [
                { icon: 'person-outline', label: 'Edit Profile', action: () => console.log('Edit Profile') },
                { icon: 'lock-closed-outline', label: 'Privacy & Security', action: () => console.log('Privacy') },
            ]
        },
        {
            title: 'Preferences',
            items: [
                {
                    icon: 'moon-outline',
                    label: 'Dark Mode',
                    type: 'toggle',
                    value: isDarkMode,
                    onValueChange: () => setIsDarkMode(prev => !prev)
                },
                {
                    icon: 'notifications-outline',
                    label: 'Notifications',
                    type: 'toggle',
                    value: isNotificationsEnabled,
                    onValueChange: () => setIsNotificationsEnabled(prev => !prev)
                },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: 'help-circle-outline', label: 'Help & Support', action: () => console.log('Help') },
                { icon: 'information-circle-outline', label: 'About', action: () => console.log('About') },
            ]
        }
    ];

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => console.log("Delete Account") }
            ]
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={require('../../assets/img/profile.png')}
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.editIcon}>
                        <Ionicons name="camera" size={20} color={Colors.surface} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.nameText}>Mike</Text>
                <Text style={styles.emailText}>mike@example.com</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.sectionContent}>
                            {section.items.map((item, itemIndex) => (
                                <View key={itemIndex}>
                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={item.type === 'toggle' ? item.onValueChange : item.action}
                                        disabled={item.type === 'toggle'}
                                    >
                                        <View style={styles.menuItemLeft}>
                                            <View style={styles.iconBox}>
                                                <Ionicons name={item.icon as any} size={22} color={Colors.primary} />
                                            </View>
                                            <Text style={styles.menuItemText}>{item.label}</Text>
                                        </View>

                                        {item.type === 'toggle' ? (
                                            <Switch
                                                trackColor={{ false: Colors.disabled, true: Colors.primary }}
                                                thumbColor={Colors.surface}
                                                ios_backgroundColor={Colors.disabled}
                                                onValueChange={item.onValueChange}
                                                value={item.value}
                                            />
                                        ) : (
                                            <Ionicons name="chevron-forward" size={20} color={Colors.text} style={{ opacity: 0.5 }} />
                                        )}
                                    </TouchableOpacity>
                                    {itemIndex < section.items.length - 1 && <View style={styles.separator} />}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                {/* Log Out Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Log Out', 'Are you sure?')}>
                    <Ionicons name="log-out-outline" size={24} color={Colors.surface} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                {/* Delete Account */}
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                    <Text style={styles.deleteText}>Delete Account</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>Version 1.0.0</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: Colors.surface,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: Colors.background,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.surface,
    },
    nameText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 5,
    },
    emailText: {
        fontSize: 16,
        color: Colors.text,
        opacity: 0.6,
    },
    menuContainer: {
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 10,
        marginLeft: 10,
        opacity: 0.8,
    },
    sectionContent: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.background,
        marginLeft: 66, // Align with text
    },
    logoutButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 20,
        gap: 10,
        marginBottom: 15,
    },
    logoutText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.surface,
    },
    deleteButton: {
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteText: {
        color: 'red',
        fontSize: 16,
        fontWeight: '500',
    },
    versionText: {
        textAlign: 'center',
        color: Colors.text,
        opacity: 0.4,
        marginBottom: 20,
    }
});
