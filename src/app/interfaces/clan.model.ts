export interface Clan {
    items: ClanItem[];
}
export interface ClanItem {
    tag: string,
    name: string,
    type: string,
    badgeId: number,
    clanScore: number,
    clanWarTrophies: number,
    location: Location
    requiredTrophies: number,
    donationsPerWeek: number,
    clanChestLevel: number,
    clanChestMaxLevel: number,
    members: number
}

interface Location {
    id: number,
    name: string,
    isCountry: boolean
}

export function InitializeClan(): Clan{
    return {
        items: [],
    }
}