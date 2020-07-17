import {FormType, ID, IThunkAction, StringsJson} from '../../../utils/types';
import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {DataRequestReducer} from '../../../utils/generics';
import {useParams} from 'react-router';
import {Typography} from '@material-ui/core';
import ILoader from '../../utils/ILoader';
import NotMatch from '../../utils/NotMatch';

interface ComponentProps<F> {
    form: F;
}

const strings: StringsJson = {
    formNotFoundPrefix: {
        en: 'form',
        fa: 'فرم',
    },
};

const withForm = <F extends FormType>(
    getReducer: (state: RootState) => DataRequestReducer<F | undefined>,
    getAction: (id: ID) => IThunkAction,
) => (Component: React.ComponentType<ComponentProps<F>>): React.FC => () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const form = useSelector<RootState, F | undefined>(
        (state) => getReducer(state).data,
    );
    const isLoading = useSelector<RootState, boolean>(
        (state) => getReducer(state).isLoading,
    );

    useEffect(() => {
        dispatch(getAction(id));
    }, [dispatch, id]);

    return (
        <ILoader isLoading={isLoading}>
            {form ? (
                <>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <Typography variant="h5" className="m-1">
                            {form.title}
                        </Typography>
                        <Typography
                            variant="caption"
                            className="m-1">{`(${form.id})`}</Typography>
                    </div>
                    <Component form={form} />
                </>
            ) : (
                <NotMatch prefix={strings.prefix} />
            )}
        </ILoader>
    );
};

export default withForm;
