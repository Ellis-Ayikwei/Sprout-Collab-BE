import logInSlice from "./authActions/LoginSlice";
import checklistSliceReducer from "./ChecklistSlice";
import collabReducer from "./collabSlice";
import goalsReducer from "./goalsSlice";
import goalTypesReducer from "./goalTypeSlice";
import loadingSlice from "./mainLoaderSlice";
import myGoalSlice from "./myGoalSlice";
import myProjectSliceReducer from "./myProjectSlice";
import projectsSliceReducer from "./ProjectsSlice";
import resourceSliceReducer from "./ResourceSlice";
import taskSliceReducer from "./TaskSlice";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage, // Use localStorage
};

const rootReducer = combineReducers({
    goals: goalsReducer,
		mygoals: myGoalSlice,
		goalTypes: goalTypesReducer,
		myprojects: myProjectSliceReducer,
		projects: projectsSliceReducer,
		tasks: taskSliceReducer,
		taskCheckList: checklistSliceReducer,
		collaborations: collabReducer,
		loading: loadingSlice,
		resources: resourceSliceReducer,
		login: logInSlice,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
	reducer: persistedReducer,

	middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Avoid errors with redux-persist actions
            },
        }),
});

const persistor = persistStore(store);

export { persistor };

export default store;
