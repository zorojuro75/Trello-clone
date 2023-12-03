
type TypedColumn = 'todo' | 'inprogress' | 'done'

interface Task {
    id: number;
    title: string;
    image?: string;
    date: string;
    description: string;
    status: string;
}