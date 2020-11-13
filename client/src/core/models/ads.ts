export type StatsType = 'playbackStarted' | 'click';
export type BannerData = {
    title?: string;
    url_types?: string;
    bannerID?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageLink?: string;
    trackingLink?: string;
    type?: string;
    iconWidth?: number;
    domain?: string;
    ctaText?: string;
    advertisingLabel?: string;
    iconLink?: string;
    statistics?: Array<{
        type: StatsType;
        url: string;
    }>;
    openInBrowser?: boolean;
    iconHeight?: number;
    directLink?: boolean;
    navigationType?: string;
    description?: string;
    ageRestriction?: number;
};