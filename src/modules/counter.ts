//액션 type 선언
const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;


//액션 생성 함수 선언
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff
});
// export const updateCountAsync = (count: number) => (dispatch: any) => { // redux 미들웨어 예시 // 비동기를 동기식으로
//     func
//         .getAccount(serviceIdx)
//         .then((result) => {
//             //result반환
//             dispatch(increase()); 
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };

//액션 객체들에 대한 type 준비하기
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

  //상태의 타입과 상태의 초깃값 선언하기
interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 0
};

const counter = (state: CounterState = initialState, action: CounterAction) =>{
    switch(action.type){
        case INCREASE:
            return { count: state.count + 1 };
        case DECREASE:
            return { count: state.count - 1 };
        case INCREASE_BY:
            return { count: state.count + action.payload };
        default:
            return state;
    }
}

export default counter;  