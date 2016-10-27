import {isEmpty, negate} from 'lodash/fp';

export const notEmpty = negate(isEmpty);
