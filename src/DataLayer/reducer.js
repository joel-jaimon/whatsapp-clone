export const initialState = {
  user: {
    uid: "y1RAPFkAFxbqsCd2hbbEb5X3yxA2",
    displayName: "Joel Jaimon",
    photoURL:
      "https://lh3.googleusercontent.com/a-/AOh14Gj2k-ydw4MB4z9ryB0V_xNJCuDmIjGmTWVaT1FSQw",
    email: "joel.jaimon99@gmail.com",
    emailVerified: true,
    phoneNumber: null,
    isAnonymous: false,
    tenantId: null,
    providerData: [
      {
        uid: "104767365938821547282",
        displayName: "Joel Jaimon",
        photoURL:
          "https://lh3.googleusercontent.com/a-/AOh14Gj2k-ydw4MB4z9ryB0V_xNJCuDmIjGmTWVaT1FSQw=s96-c",
        email: "joel.jaimon99@gmail.com",
        phoneNumber: null,
        providerId: "google.com",
      },
    ],
    apiKey: "AIzaSyDn4n3qI42bVFfByfRmKVdeMMcwd4pWTAE",
    appName: "[DEFAULT]",
    authDomain: "whatsapp-clone-738d9.firebaseapp.com",
    stsTokenManager: {
      apiKey: "AIzaSyDn4n3qI42bVFfByfRmKVdeMMcwd4pWTAE",
      refreshToken:
        "AOvuKvTVYAM1k-z3_sWzHFHpNbPM_JrlppWAKS73eeNAcRaRd81woPHKz4_rQ884K2r0TKLFp9MOwscwt84v3EY_nowv33V27OF27vOQJB9KIkZu4KxoIg3zUGSHOeIYfxuPVMtOrjOYIl5rJ5aUjBwznOVkVUqdUBM1t9oJ0wuzJ1AydEhKlIqfeyJ1TT2wGnuk5s8Eq58vXJWQEcml1wAK4DMmKJPVzicTBUul46x-oA3edXcws_Ix5uJjz5QGY9SNM6v4aD_B2U7TssWiUGgc8zcICjR_6r3aMvFxbNWkySJXeBYELb2WorfXQVo9Laogv3j_6pI9RgkumaEAdXN8pXoQ1Jm3VYcaMiyYqCr9dM73s9Tf1XdHqP4Y7ZmCWF_V9K7ykkQNY6z6ma3AgJBG3nN2lXP4i_51Vpj7oAHfVwJnuuYz3A8-NCRuoYALBVHIBzvBfN88",
      accessToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NDY2MjEyMTQxMjQ4NzUxOWJiZjhlYWQ4ZGZiYjM3ODYwMjk5ZDciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSm9lbCBKYWltb24iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2oyay15ZHc0TUI0ejlyeUIwVl94TkpDdURtSWpHbVRXVmFUMUZTUXciLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2hhdHNhcHAtY2xvbmUtNzM4ZDkiLCJhdWQiOiJ3aGF0c2FwcC1jbG9uZS03MzhkOSIsImF1dGhfdGltZSI6MTYxNjc1NTYyMywidXNlcl9pZCI6InkxUkFQRmtBRnhicXNDZDJoYmJFYjVYM3l4QTIiLCJzdWIiOiJ5MVJBUEZrQUZ4YnFzQ2QyaGJiRWI1WDN5eEEyIiwiaWF0IjoxNjE2NzU1NjIzLCJleHAiOjE2MTY3NTkyMjMsImVtYWlsIjoiam9lbC5qYWltb245OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNDc2NzM2NTkzODgyMTU0NzI4MiJdLCJlbWFpbCI6WyJqb2VsLmphaW1vbjk5QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.F0_wrx_VBn0TBrLBM7Q2pNfTH-LyBkNrLP83bo_MZUIheG1EVFvgXLU9a4Abnhe7vY0h4bdgn4htNik3Ol-BUSjCkSwGyxPu8caf8rwNAYvalIZl5aHihRi9foWoLkA_NgyMgVvntIt_-h1i-hvV4BNfADFiheq8o0N8sN1sGYCGwFrnbv1lRrDhEeqhLZBkGMXD1U4tBWfeL9ocm8gMD7f9cR9-e5pPpxCYXeJCMtTowvLikX-D2d-GurFkuXVj9cZGAldd4FD2q04yAqmDpIEjNbUWKx6ucQVIi-YEWKZXnfr-A3mB0M8QAwPE8DnuGAmsQgiEyn2L97ijgFt1_g",
      expirationTime: 1616759223000,
    },
    redirectEventId: null,
    lastLoginAt: "1616755561288",
    createdAt: "1598306568412",
    multiFactor: {
      enrolledFactors: [],
    },
  },
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
