import * as eruda from 'eruda';
import * as erudaCode from 'eruda-code';
import * as erudaDom from 'eruda-dom';

eruda.init();
eruda.get('console');
eruda.add(erudaCode);
eruda.add(erudaDom);

export default eruda