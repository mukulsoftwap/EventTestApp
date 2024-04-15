export interface Event {
    id: number;
    name: string;
    location: string;
    thumbnail: string;
    entryType: 'paid' | 'free';
}
  