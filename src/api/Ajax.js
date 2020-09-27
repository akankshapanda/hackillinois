import axios from 'axios';
import { routes } from "./Routes";

export const fetchEvents = () => axios.get(routes.fetchEvents());
