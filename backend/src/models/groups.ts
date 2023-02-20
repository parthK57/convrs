export interface details{
    username: string;
    email: string;
}

export interface selectDetails {
    groupMember: string | null;
    email: string;
}

export type selectDetailsArray = Array<selectDetails>;

export type detailsArray = Array<details>;