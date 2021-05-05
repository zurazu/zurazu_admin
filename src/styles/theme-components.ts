import * as styledComponents from 'styled-components';
import {Theme} from './theme';

//ThemeProvider 는 styled-components 에서 지원 하는 함수로 redux 처럼 ThemeProvider 로 감싼 내부의 컴포넌트들에게 공통된 global 값을 내려줄 수 있습니다.
const {
    default: styled,
    css,
    keyframes,
    ThemeProvider,
} = styledComponents as unknown as styledComponents.ThemedStyledComponentsModule<Theme>;

export { css, keyframes, ThemeProvider};

export default styled; 