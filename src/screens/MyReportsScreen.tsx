import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Filter, MapPin, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react-native';

import { MOCK_REPORTS } from '../data/mockReports';

export function MyReportsScreen({ navigation }: any) {
    const [filter, setFilter] = useState('Barchasi');

    const getStatusValue = (filterLabel: string) => {
        switch (filterLabel) {
            case 'Yangi': return 'new';
            case 'Jarayonda': return 'pending';
            case 'Hal qilingan': return 'resolved';
            default: return null;
        }
    };

    const filteredReports = filter === 'Barchasi'
        ? MOCK_REPORTS
        : MOCK_REPORTS.filter(r => r.status === getStatusValue(filter));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-red-100 text-red-700';
            case 'pending': return 'bg-orange-100 text-orange-700';
            case 'resolved': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'resolved': return <CheckCircle size={14} color="#15803d" />;
            case 'pending': return <Clock size={14} color="#ea580c" />;
            case 'new': return <AlertCircle size={14} color="#dc2626" />;
            default: return <AlertCircle size={14} color="#6b7280" />;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="bg-gray-50 p-3 rounded-xl">
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Mening Arizalarim</Text>
                <View style={{ width: 48 }} />
            </View>

            {/* Content */}
            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 flex-row gap-3">
                    {['Barchasi', 'Yangi', 'Jarayonda', 'Hal qilingan'].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setFilter(item)}
                            className={`px-4 py-2 rounded-xl border mr-2 ${filter === item ? 'bg-[#37a16a] border-[#37a16a]' : 'bg-white border-gray-200'}`}
                        >
                            <Text className={filter === item ? 'text-white font-medium' : 'text-gray-600'}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* List */}
                <View className="gap-4 mb-20">
                    {filteredReports.map((report) => (
                        <TouchableOpacity
                            key={report.id}
                            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm active:bg-gray-50"
                            onPress={() => navigation.navigate('ReportDetail', { report })}
                        >
                            <View className="flex-row gap-4">
                                <Image source={{ uri: report.image }} className="w-20 h-20 rounded-xl bg-gray-100" />
                                <View className="flex-1">
                                    <View className="flex-row items-center justify-between mb-1">
                                        <View className={`flex-row items-center gap-1 px-2 py-1 rounded-lg ${getStatusColor(report.status).split(' ')[0]}`}>
                                            {getStatusIcon(report.status)}
                                            <Text className={`text-xs font-bold ${getStatusColor(report.status).split(' ')[1]}`}>
                                                {report.status === 'new' ? 'Yangi' : report.status === 'pending' ? 'Jarayonda' : 'Hal qilingan'}
                                            </Text>
                                        </View>
                                        <Text className="text-xs text-gray-400">{report.date}</Text>
                                    </View>
                                    <Text className="text-gray-900 font-bold mb-1" numberOfLines={2}>{report.description}</Text>
                                    <Text className="text-xs text-gray-500" numberOfLines={1}>{report.address}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
