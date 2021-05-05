import { combineReducers } from 'redux';
import counter from './counter';


//한 저장소에 리듀서를 여러개 만들어 사용하기 위해 combineReducers 사용
const rootReducer = combineReducers({
  counter,
});

export default rootReducer;


// RootState은 추후 우리가 컨테이너 컴포넌트를 만들게 될 때 스토어에서 관리하고 있는 상태를 조회하기 위해서 useSelector를 사용 할 때 필요
export type RootState = ReturnType<typeof rootReducer>;  