
export interface UpdateTaskParams {
  id: string;
}

export interface UpdateTaskBody {
  task?: string;
  disc?: string;
  completed?: boolean;
  favorite?: boolean;
}

export interface FavTaskParams {
  id: string;
}

export interface FavTaskBody {
  favorite: boolean;
}



export interface CompleteTaskParams {
  id: string;
}

export interface CompleteTaskBody {
  completed: boolean;
}
export interface DeleteTaskParams {
  id: string;
}

export interface INote extends Document {
  task: string;
  disc?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

