import { AnyAction } from 'redux';

// predicate function
// AC = ActionCreator
//  & = intersection
// is = narrows the scope
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
}

// type overload with action creators
export function withMatcher<
  AC extends () => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// one of the few times using "any" is acceptable, because it actually could be anything
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// generic function to implement typing (above)
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// function overloading
export function createAction<T extends string, P>(
  type: T, 
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T, 
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
