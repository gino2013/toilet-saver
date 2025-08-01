export function createToiletItem(toilet, index = 0) {
    const distance = toilet.distance ? `${(toilet.distance * 1000).toFixed(0)}m` : '';
    
    const featureBadges = [];
    if (toilet.accessible) {
        featureBadges.push(`<span class="feature-tag accessible"><i class="fas fa-wheelchair"></i> 無障礙</span>`);
    }
    if (toilet.fee) {
        featureBadges.push(`<span class="feature-tag free"><i class="fas fa-coins"></i> 免費</span>`);
    }
    if (toilet.isOpenNow) {
        const openText = toilet.openingHours === '24/7' ? '24小時開放' : '可能開放';
        featureBadges.push(`<span class="feature-tag open"><i class="fas fa-clock"></i> ${openText}</span>`);
    }
    if (toilet.openingHours && toilet.openingHours !== '24/7') {
        featureBadges.push(`<span class="feature-tag hours"><i class="fas fa-calendar-alt"></i> ${toilet.openingHours}</span>`);
    }

    return `
        <div class="toilet-item" data-toilet-id="${toilet.id}" onclick="selectToilet('${toilet.id}')">
            <div class="toilet-header">
                <div class="toilet-name">${toilet.name}</div>
                ${distance ? `<div class="toilet-distance">${distance}</div>` : ''}
            </div>
            ${toilet.operator ? `<div class="toilet-address">${toilet.operator}</div>` : ''}
            <div class="toilet-features">
                ${featureBadges.join('')}
            </div>
        </div>
    `;
}