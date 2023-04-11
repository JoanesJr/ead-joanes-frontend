
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {config} from '../config';



// Initialize Firebase
export const app = initializeApp(config);
export const analytics = getAnalytics(app);