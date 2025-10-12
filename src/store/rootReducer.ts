import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux'
import base, { BaseState } from './slices/base'
import locale, { LocaleState } from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'

export type RootState = CombinedState<{
  base: CombinedState<BaseState>
  locale: LocaleState
  theme: ThemeState
}>

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
  base,
  locale,
  theme,
}

const rootReducer =
  (asyncReducers?: AsyncReducers) => (state: RootState, action: AnyAction) => {
    const combinedReducer = combineReducers({
      ...staticReducers,
      ...asyncReducers,
    })
    return combinedReducer(state, action)
  }

export default rootReducer
