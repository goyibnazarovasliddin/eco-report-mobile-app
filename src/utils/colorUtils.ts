export const getAQIColor = (aqi: number): { bg: string, text: string, border: string, icon: string } => {
    if (aqi <= 50) return { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-100', icon: '#16A34A' };
    if (aqi <= 100) return { bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-100', icon: '#EAB308' };
    if (aqi <= 150) return { bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-100', icon: '#F97316' };
    if (aqi <= 200) return { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-100', icon: '#EF4444' };
    return { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-100', icon: '#A855F7' };
};

export const getHumidityColor = (humidity: number): { bg: string, text: string, border: string, icon: string } => {
    if (humidity < 30) return { bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-100', icon: '#EAB308' };
    if (humidity <= 60) return { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-100', icon: '#16A34A' };
    return { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-100', icon: '#EF4444' };
};

export const getTempColor = (temp: number): { bg: string, text: string, icon: string } => {
    if (temp <= 0) return { bg: 'bg-blue-50', text: 'text-blue-900', icon: '#3B82F6' };
    if (temp <= 15) return { bg: 'bg-cyan-50', text: 'text-cyan-900', icon: '#06B6D4' };
    if (temp <= 25) return { bg: 'bg-green-50', text: 'text-green-900', icon: '#22C55E' };
    if (temp <= 35) return { bg: 'bg-orange-50', text: 'text-orange-900', icon: '#F97316' };
    return { bg: 'bg-red-50', text: 'text-red-900', icon: '#EF4444' };
};
