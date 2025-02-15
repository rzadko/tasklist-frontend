export enum Status {
    TODO = "To Do",
    INPROGRESS = "In Progress",
    DONE = "Done",
}

export interface Task {
    _id: string;
    title: string;
    status: Status;
    assignee: string;
    description: string;
}
