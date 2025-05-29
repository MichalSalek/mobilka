import {EVENTS_POLICY_TYPE} from "../../policies/events.policy";
import {EVENT_INFO_TYPE} from "../commands-and-queries/cqrs.types";

export const eventsDisallowedForUI: EVENTS_POLICY_TYPE['eventsDisallowedForUI'] = [ 'SUCCESS', 'NOTES_FETCHED', 'USER_ALREADY_EXISTS', 'USER_NOT_FOUND' ] as const
