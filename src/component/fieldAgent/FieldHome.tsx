import {Form} from '../../utils/types';
import {getForms} from './actions';
import EmptyFormsListItem from './HomeListItem';
import createGenericFormsList from './createGenericFormsList';

const strings = {
    title: {
        en: 'List of forms',
        fa: 'لیست فرم‌ها',
    },
    subtitle: {
        en: 'Click on one of them to be redirected to the relevant form',
        fa: 'روی یکی از فرم‌های زیر کلیک کنید تا به صفحه‌ی مورد نظر هدایت شوید',
    },
};
const FieldHome = createGenericFormsList<Form>(
    strings,
    (state) => state.field.forms,
    getForms,
    EmptyFormsListItem,
);
export default FieldHome;