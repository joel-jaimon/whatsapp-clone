let call: any;
let myMediaStream: any;

export const setActivePeerCall = (_call: any) => {
  call = _call;
};

export const getActivePeerCall = () => call;

export const setActiveMediaStream = (stream: any) => {
  myMediaStream = stream;
};

export const getActiveMediaStream = () => myMediaStream;
