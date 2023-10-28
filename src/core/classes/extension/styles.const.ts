export const styles = `
 .presentation{
     padding:16px 0;
}
 #jsoneditor{
     padding:32px;
	 
}
 .json {
     margin-left:-20px;
     color:#8d9298;
     font-size: 16px;
	 
}
 .json > .json__item {
     display: block;
	 background:white;
	 margin-bottom:16px;
	 padding:16px;
	     border-radius: 4px;
    background: #f1f3f4;
    box-shadow: 4px 4px 8px #d4dbde, -4px -4px 8px #fafafb;
}
.json > .json__item:before {
   
    left: 24px;
    top: 30px;
}
 .json__item {
     margin:0 0 0 20px;
     border-radius: 4px;
     display: none;
     user-select: none;
     }
 .json__item--collapsible {
     cursor: pointer;
     // overflow: hidden;
     position: relative;
}
 .json__item--collapsible::before {
     transition:all 300ms;
     content: '▼';
     font-size: 8px;
     position: absolute;
         left: 8px;
    top: 13px;
}
 // .json__item--collapsible::after {
     // background-color: lightgrey;
     // content: '';
     // height: 100%;
     // left: 9px;
     // position: absolute;
     // top: 26px;
     // width: 1px;
     // 
}
 .json__item--collapsible:hover > .json__key, .json__item--collapsible:hover > .json__value, .json__item--collapsible:hover::before {
    //  color:#24343d;
    //  font-weight: 600;
}
 .json__toggle {
     display: none;
}
 .json__toggle:checked ~ .json__item {
     display: block;
}
 .json__toggle:not(:checked) ~ .json__key {
     border-radius: 4px;
     background: #f1f3f4;
     box-shadow: 4px 4px 8px #d4dbde, -4px -4px 8px #fafafb;
	
	b;
}
 .json__toggle:not(:checked) ~ .json__key:hover {
     border-radius: 4px;
     background: linear-gradient(145deg, white, #e3e7e9);
     box-shadow: 4px 4px 8px #d4dbde, -4px -4px 8px #fafaf
}
 .json__toggle:not(:checked) ~ .json__key:active {
    border-radius: 4px;
     background: linear-gradient(145deg, #e3e7e9, white);
     box-shadow: 4px 4px 8px #d4dbde, -4px -4px 8px #fafafb;
}
 .json__key {
     transition:all 300ms;
     text-align:left;
     width:100%;
     padding: 12px 24px 8px;
     font-size: 13px;
     font-weight: 500;
     display: inline-flex;
     align-items: center;
     gap: 4px;
     letter-spacing: 0.5px;
}
 .json__value {
     transition:all 300ms;
     display: inline;
}
 .json__value--string {
     color: green;
}
 .json__value--type-object {
     font-size: 10px;
     font-weight:400;
}
 .json__value--number {
     color: blue;
}
 .json__value--boolean {
     color: red;
}
 
`;
