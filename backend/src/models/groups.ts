export interface details{
    email: string;
}

export interface selectDetails {
    groupMember: string | null;
    email: string;
}

export type selectDetailsArray = Array<selectDetails>;

export type detailsArray = Array<details>;