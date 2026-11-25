import{readFileSync as R,readdirSync as E,mkdirSync as M,writeFileSync as W}from'node:fs';
const T=e=>{throw e},U=a=>a>>>0;
const B=[(a,b)=>a+b|0,(a,b)=>a-b|0,Math.imul,(a,b)=>b?(a/b)|0:T(4),(a,b)=>b?a%b|0:T(4),(a,b)=>b?U(a)/U(b)|0:T(4),(a,b)=>b?U(a)%U(b)|0:T(4),0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>(a>>>b)|0,0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>U(a)<U(b)?1:0];
const PP='01146:;?0000000099999995999599909990000000000000044000000000000058000000000000004414';
function run(p,q){
  const n=p.length,D=[],C=[],G=[],o=[];
  let pc=0,ip=0,st=0,sp=0,cs=0;
  const done=c=>[Buffer.from(o),c];
  try{
    for(;;){
      if(st++===1e6)T(10);
      if(pc<0||pc>=n)T(9);
      const op=p[pc],m=op==2?4:op==1?1:op>47&&op<52?2:0,nx=pc+1+m;
      if(pc+m>=n)T(9);
      pc=nx;
      const k=PP.charCodeAt(op)-48;
      if(sp<(k>>2))T(2);
      if(sp-(k>>2)+(k&3)>256)T(3);
      switch(op){
        case 0:return done(0);
        case 1:D[sp++]=(p[nx-1]<<24)>>24;break;
        case 2:D[sp++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
        case 3:sp--;break;
        case 4:D[sp]=D[sp-1];sp++;break;
        case 5:{const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t;break;}
        case 6:D[sp]=D[sp-2];sp++;break;
        case 7:{const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a;break;}
        case 23:case 27:D[sp-1]=op===23?-D[sp-1]|0:~D[sp-1];break;
        case 48:pc=nx+(((p[nx-2]|p[nx-1]<<8)<<16)>>16);break;
        case 49:case 50:{const v=D[--sp],rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;if((op===49)===(v===0))pc=nx+rel;break;}
        case 51:if(cs===64)T(7);C[cs++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
        case 52:if(cs===0)T(8);pc=C[--cs];break;
        case 64:{const a=D[sp-1];if(a<0||a>255)T(6);D[sp-1]=G[a]|0;break;}
        case 65:{const a=D[sp-1],v=D[sp-2];if(a<0||a>255)T(6);sp-=2;G[a]=v;break;}
        case 80:{const t=String(D[sp-1]);if(o.length+t.length>65536)T(11);sp--;o.push(...Buffer.from(t));break;}
        case 81:if(o.length>=65536)T(11);o.push(D[--sp]&255);break;
        case 82:D[sp++]=ip<q.length?q[ip++]:-1;break;
        case 83:return done(D[--sp]&255);
        default:
          if(op>15&&op<35){
            const f=B[op-16];
            if(!f)T(5);
            D[sp-2]=f(D[sp-2],D[sp-1]);sp--;
          }else T(5);
      }
    }
  }catch(e){return done(e);}
}
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
for(const d of E(I).sort()){
  const a=I+'/'+d+'/',b=O+'/'+d+'/',[x,c]=run(R(a+'program.bin'),R(a+'input.bin'));
  M(b,{recursive:true});
  W(b+'stdout.bin',x);
  W(b+'exit.txt',''+c);
}
