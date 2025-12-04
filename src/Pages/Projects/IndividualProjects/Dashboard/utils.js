export const formatTitleLabel = str =>
    str
        .split(/[_\s]+/) // split on underscores or spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

export const formatNumber = (value) => {
    if (value == null || isNaN(value)) return { number: '0.00', suffix: '' };
    
    let scaledValue = value;
    let suffix = '';

    if (value >= 1_000_000) {
        scaledValue = value / 1_000_000;
        suffix = 'Million CHF';
    } else if (value >= 1_000) {
        scaledValue = value / 1_000;
        suffix = 'Thousand CHF';
    } else {
        scaledValue = value
        suffix = 'CHF'
    }

    const formattedNumber = scaledValue
        .toLocaleString('en-US', {
            minimumFractionDigits: value >= 1_000 ? 2 : 0,
            maximumFractionDigits: value >= 1_000 ? 2 : 0,
        })
        .replace(/,/g, "'");

    return { formattedNumber, suffix };
    };

export const filterData = (rawData, selectedCategory, selectedRegion, selectedPeriod) => {
    if (!Array.isArray(rawData)) return [];

    // Filter by category
    let filteredData = rawData;
    if (selectedCategory && selectedCategory !== 'All') {
        filteredData = filteredData.filter(item => item.category === selectedCategory);
    }

    // Filter by region
    if (selectedRegion && selectedRegion !== 'All') {
        filteredData = filteredData.filter(item => item.region === selectedRegion);
    }

     // Filter by month range
    if (selectedPeriod && selectedPeriod.length === 2) {
        const [startMonth, endMonth] = selectedPeriod;
        filteredData = filteredData.filter(item => {
            const month = Number(item.month);
            return month >= startMonth && month <= endMonth;
    });
    }

    return filteredData;
};