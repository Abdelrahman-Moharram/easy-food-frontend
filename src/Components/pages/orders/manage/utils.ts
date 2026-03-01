export const getVariantClasses = (variant: string) => {
    const map: Record<string, { headerColor: string; dotColor: string; badgeColor: string }> = {
        blue: {
            headerColor: 'bg-blue-100 text-blue-700',
            dotColor: 'bg-blue-500',
            badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
        },
        amber: {
            headerColor: 'bg-amber-100 text-amber-700',
            dotColor: 'bg-amber-500',
            badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        },
        emerald: {
            headerColor: 'bg-emerald-100 text-emerald-700',
            dotColor: 'bg-emerald-500',
            badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        },
        neutral: {
            headerColor: 'bg-neutral-100 text-neutral-600',
            dotColor: 'bg-neutral-400',
            badgeColor: 'bg-neutral-100 text-neutral-500 border-neutral-200',
        },
        red: {
            headerColor: 'bg-red-100 text-red-700',
            dotColor: 'bg-red-500',
            badgeColor: 'bg-red-100 text-red-700 border-red-200',
        },
        purple: {
            headerColor: 'bg-purple-100 text-purple-700',
            dotColor: 'bg-purple-500',
            badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
        },
    };

    return map[variant] || map.neutral;
};
