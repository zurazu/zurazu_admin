/*
[반응형 설정] styles폴더 내부에 theme.ts 파일 생성 
=> 자주쓰는 폰트나 색상등을 미리 지정할 수 있다.
==> 다크모드 등 추가가능
*/

import baseStyled, {
    css,
    CSSProp,
    ThemedStyledInterface,
} from 'styled-components';


/* PC , 테블릿 가로 (해상도 768px ~ 1023px)*/
/* 테블릿 세로 (해상도 768px ~ 1023px)*/
/* 모바일 가로, 테블릿 세로 (해상도 480px ~ 767px)*/
/* 모바일 가로, 테블릿 세로 (해상도 ~ 479px)*/
const sizes:{[key:string]: number} = {
	mobile: 479,
	tabletS: 480,
	tabletM: 768,
	desktop: 1024
}

type BackQuoteArgs = string[];

interface Media {
	mobile: (...args: BackQuoteArgs) => CSSProp | undefined,
	tabletS: (...args: BackQuoteArgs) => CSSProp | undefined,
	tabletM: (...args: BackQuoteArgs) => CSSProp | undefined,
	desktop: (...args: BackQuoteArgs) => CSSProp | undefined,
}

const media: Media = {
	mobile: (...args: BackQuoteArgs) => undefined,
	tabletS: (...args: BackQuoteArgs) => undefined,
	tabletM: (...args: BackQuoteArgs) => undefined,
	desktop: (...args: BackQuoteArgs) => undefined
};

//화면 사이즈에 따른 media 쿼리를 통한 자동 리사이징
/**사용 예시
 interface Text {
    text: string;
}
 const Box = styled.div<Text>`
    width: 200px;
    height 200px;
    border: 1px solid red;
    ${({theme}) => theme.media.desktop`        
        border: 2px solid blue;
        ${(props: Text) => `&::before{
            content:"데스크톱 ${props.text}"
        }`};
    `}
    ${({theme}) => theme.media.tablet`
        border: 2px solid yellow;
        ${(props: Text) => `&::before{
            content:"태블릿 ${props.text}"
        }`}
    `}
    ${({theme}) => theme.media.mobile`
        border: 2px solid purple;
        ${(props: Text) => `&::before{
            content:"모바일 ${props.text}"
        }`}
    `}
`
 */
Object.keys(sizes).reduce((acc: Media, label: string) => {
	switch (label) {
		case 'desktop':
			acc.desktop = (...args: BackQuoteArgs) => css`
            @media only screen and (min-width: ${sizes.desktop}px) {
                ${args}}`;
			break;
		case 'tabletM':
			acc.tabletM = (...args: BackQuoteArgs) => css`
            @media only screen and (max-width: ${sizes.desktop}px) and (min-width: ${sizes.tabletM}px) {
                ${args}}`;
            break;
            case 'tabletS':
                acc.tabletS = (...args: BackQuoteArgs) => css`
                @media only screen and (max-width: ${sizes.tabletM}px) and (min-width: ${sizes.tabletS}px) {
                    ${args}}`;
                break;            
		case 'mobile':
			acc.mobile = (...args: BackQuoteArgs) => css`
            @media only screen and (max-width: ${sizes.tabletS}px) {
                ${args}}`;
			break;
		default:
			break;
	}
    return acc;
},media);

const colors = {
    white: '#ffffff',
    black: '#000000',
    mainColor: "#214AD9",
};

const secondaryColors = {};
const fontSizes: string[] = [];

const theme = {
    colors,
    fontSizes,
    secondaryColors,
    media,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme; 