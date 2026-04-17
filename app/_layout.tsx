import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OfflineIndicator } from '../components/OfflineIndicator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <OfflineIndicator />
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: '#fff1e6' },
          headerTintColor: '#3a2f2f',
          tabBarStyle: { backgroundColor: '#fff1e6', borderTopColor: '#ffe4d1' },
          tabBarActiveTintColor: '#ff6b6b',
          tabBarInactiveTintColor: '#d97757',
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
    </QueryClientProvider>
  );
}
