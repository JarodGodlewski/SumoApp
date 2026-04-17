import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OfflineIndicator } from '../components/OfflineIndicator';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

function TabLayout() {
  const { isDark } = useTheme();
  return (
    <View className={isDark ? 'dark flex-1' : 'flex-1'}>
      <OfflineIndicator />
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: isDark ? '#1a1a1a' : '#fff1e6' },
          headerTintColor: isDark ? '#f5f5f5' : '#3a2f2f',
          tabBarStyle: { backgroundColor: isDark ? '#1a1a1a' : '#fff1e6', borderTopColor: isDark ? '#333' : '#ffe4d1' },
          tabBarActiveTintColor: '#ff6b6b',
          tabBarInactiveTintColor: isDark ? '#aaa' : '#d97757',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Stable',
            tabBarIcon: () => <Text>🏠</Text>,
          }}
        />
        <Tabs.Screen
          name="draft"
          options={{
            title: 'Draft',
            tabBarIcon: () => <Text>🎯</Text>,
          }}
        />
        <Tabs.Screen
          name="rumble"
          options={{
            title: 'Rumble',
            tabBarIcon: () => <Text>🥋</Text>,
          }}
        />
        <Tabs.Screen
          name="live"
          options={{
            title: 'Live',
            tabBarIcon: () => <Text>📺</Text>,
          }}
        />
      </Tabs>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TabLayout />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
