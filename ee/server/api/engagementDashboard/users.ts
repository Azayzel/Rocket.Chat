import { check, Match } from 'meteor/check';

import { API } from '../../../../app/api/server';
import {
	findWeeklyUsersRegisteredData,
	findActiveUsersMonthlyData,
	findBusiestsChatsInADayByHours,
	findBusiestsChatsWithinAWeek,
	findUserSessionsByHourWithinAWeek,
} from '../../lib/engagementDashboard/users';
import { isDateISOString, transformDatesForAPI } from '../../lib/engagementDashboard/date';

API.v1.addRoute('engagement-dashboard/users/new-users', {
	authRequired: true,
	permissionsRequired: ['view-engagement-dashboard'],
}, {
	get(): unknown {
		check(this.queryParams, Match.ObjectIncluding({
			start: Match.Where(isDateISOString),
			end: Match.Where(isDateISOString),
		}));

		const { start, end } = this.queryParams;

		const data = Promise.await(findWeeklyUsersRegisteredData(transformDatesForAPI(start, end)));
		return API.v1.success(data);
	},
});

API.v1.addRoute('engagement-dashboard/users/active-users', {
	authRequired: true,
	permissionsRequired: ['view-engagement-dashboard'],
}, {
	get(): unknown {
		check(this.queryParams, Match.ObjectIncluding({
			start: Match.Where(isDateISOString),
			end: Match.Where(isDateISOString),
		}));

		const { start, end } = this.queryParams;

		const data = Promise.await(findActiveUsersMonthlyData(transformDatesForAPI(start, end)));
		return API.v1.success(data);
	},
});

API.v1.addRoute('engagement-dashboard/users/chat-busier/hourly-data', {
	authRequired: true,
	permissionsRequired: ['view-engagement-dashboard'],
}, {
	get(): unknown {
		check(this.queryParams, Match.ObjectIncluding({
			start: Match.Where(isDateISOString),
		}));

		const { start } = this.queryParams;

		const data = Promise.await(findBusiestsChatsInADayByHours(transformDatesForAPI(start)));
		return API.v1.success(data);
	},
});

API.v1.addRoute('engagement-dashboard/users/chat-busier/weekly-data', {
	authRequired: true,
	permissionsRequired: ['view-engagement-dashboard'],
}, {
	get(): unknown {
		check(this.queryParams, Match.ObjectIncluding({
			start: Match.Where(isDateISOString),
		}));

		const { start } = this.queryParams;

		const data = Promise.await(findBusiestsChatsWithinAWeek(transformDatesForAPI(start)));
		return API.v1.success(data);
	},
});

API.v1.addRoute('engagement-dashboard/users/users-by-time-of-the-day-in-a-week', {
	authRequired: true,
	permissionsRequired: ['view-engagement-dashboard'],
}, {
	get(): unknown {
		check(this.queryParams, Match.ObjectIncluding({
			start: Match.Where(isDateISOString),
			end: Match.Where(isDateISOString),
		}));

		const { start, end } = this.queryParams;

		const data = Promise.await(findUserSessionsByHourWithinAWeek(transformDatesForAPI(start, end)));
		return API.v1.success(data);
	},
});
