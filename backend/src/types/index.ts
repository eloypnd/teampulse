export interface RequestWithUser extends Express.Request {
    user?: any; // Customize this type based on your user model
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
}