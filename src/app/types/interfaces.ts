export interface User {
    name?: string | null | undefined;
    isAdmin?: boolean;
    email?: string;
    password?: string;
};

export interface UserDoc {
	_id: string;
}

export interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
}