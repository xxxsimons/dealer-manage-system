import { Async } from 'redux-action-boilerplate';

export const async = new Async({
    prefix: 'cars',
    actions: ['fetchCarsInfo'],
});

export const UPDATE_PAGINATION = 'UPDATE_PAGE';

export const updatePagination = pagination => ({
    type: UPDATE_PAGINATION,
    pagination,
});
