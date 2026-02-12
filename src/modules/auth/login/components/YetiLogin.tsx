import { useAuth } from "@/auth/useAuth";
import { svgMarkup } from "@/modules/auth/login/components/svgMarkup";
import { AppButton } from "@/shared/components/common/AppButton";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import "@/styles/yeti-login.css";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { type FormEvent, useEffect, useMemo, useRef } from "react";

export default function YetiLogin() {
  const { login } = useAuth();
  const formRef = useRef<HTMLFormElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const memoizedSvg = useMemo(() => svgMarkup, []);

  useEffect(() => {
    const root = formRef.current;
    if (!root) {
      return;
    }

    gsap.registerPlugin(MorphSVGPlugin);

    const username = usernameRef.current ?? root.querySelector<HTMLInputElement>("#username");
    const password = passwordRef.current ?? root.querySelector<HTMLInputElement>("#password");
    const mySVG = root.querySelector<HTMLElement>(".svgContainer");
    const armL = root.querySelector<SVGGElement>(".armL");
    const armR = root.querySelector<SVGGElement>(".armR");
    const eyeL = root.querySelector<SVGGElement>(".eyeL");
    const eyeR = root.querySelector<SVGGElement>(".eyeR");
    const nose = root.querySelector<SVGPathElement>(".nose");
    const mouth = root.querySelector<SVGGElement>(".mouth");
    const mouthBG = root.querySelector<SVGPathElement>(".mouthBG");
    const mouthSmallBG = root.querySelector<SVGPathElement>(".mouthSmallBG");
    const mouthMediumBG = root.querySelector<SVGPathElement>(".mouthMediumBG");
    const mouthLargeBG = root.querySelector<SVGPathElement>(".mouthLargeBG");
    const mouthMaskPath = root.querySelector<SVGPathElement>("#mouthMaskPath");
    const mouthOutline = root.querySelector<SVGPathElement>(".mouthOutline");
    const tooth = root.querySelector<SVGPathElement>(".tooth");
    const tongue = root.querySelector<SVGGElement>(".tongue");
    const chin = root.querySelector<SVGPathElement>(".chin");
    const face = root.querySelector<SVGPathElement>(".face");
    const eyebrow = root.querySelector<SVGGElement>(".eyebrow");
    const outerEarL = root.querySelector<SVGGElement>(".earL .outerEar");
    const outerEarR = root.querySelector<SVGGElement>(".earR .outerEar");
    const earHairL = root.querySelector<SVGGElement>(".earL .earHair");
    const earHairR = root.querySelector<SVGGElement>(".earR .earHair");
    const hair = root.querySelector<SVGPathElement>(".hair");

    if (
      !username ||
      !password ||
      !mySVG ||
      !armL ||
      !armR ||
      !eyeL ||
      !eyeR ||
      !nose ||
      !mouth ||
      !mouthBG ||
      !mouthSmallBG ||
      !mouthMediumBG ||
      !mouthLargeBG ||
      !mouthMaskPath ||
      !mouthOutline ||
      !tooth ||
      !tongue ||
      !chin ||
      !face ||
      !eyebrow ||
      !outerEarL ||
      !outerEarR ||
      !earHairL ||
      !earHairR ||
      !hair
    ) {
      return;
    }

    let caretPos = 0;
    let curUsernameIndex = 0;
    let screenCenter = 0;
    let svgCoords = { x: 0, y: 0 };
    const eyeMaxHorizD = 20;
    const eyeMaxVertD = 10;
    const noseMaxHorizD = 23;
    const noseMaxVertD = 10;
    let dFromC = 0;
    let mouthStatus = "small";

    const getAngle = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.atan2(y1 - y2, x1 - x2);
    };

    const getPosition = (el: HTMLElement | SVGElement) => {
      let xPos = 0;
      let yPos = 0;

      let current: Element | null = el;
      while (current) {
        if ((current as HTMLElement).tagName === "BODY") {
          const body = current as HTMLElement;
          const xScroll = body.scrollLeft || document.documentElement.scrollLeft;
          const yScroll = body.scrollTop || document.documentElement.scrollTop;

          xPos += body.offsetLeft - xScroll + body.clientLeft;
          yPos += body.offsetTop - yScroll + body.clientTop;
        } else {
          const element = current as HTMLElement;
          xPos += element.offsetLeft - element.scrollLeft + element.clientLeft;
          yPos += element.offsetTop - element.scrollTop + element.clientTop;
        }

        current = (current as HTMLElement).offsetParent;
      }

      return { x: xPos, y: yPos };
    };

    const getCoord = () => {
      const carPos = username.selectionEnd ?? username.value.length;
      const div = document.createElement("div");
      const span = document.createElement("span");
      const copyStyle = getComputedStyle(username);
      let usernameCoords = { x: 0, y: 0 };
      let caretCoords = { x: 0, y: 0 };
      let centerCoords = { x: 0, y: 0 };

      Array.from(copyStyle).forEach((prop) => {
        div.style.setProperty(prop, copyStyle.getPropertyValue(prop));
      });

      div.style.position = "absolute";
      document.body.appendChild(div);
      div.textContent = username.value.substring(0, carPos);
      span.textContent = username.value.substring(carPos) || ".";
      div.appendChild(span);

      usernameCoords = getPosition(username);
      caretCoords = getPosition(span);
      centerCoords = getPosition(mySVG);
      svgCoords = getPosition(mySVG);
      screenCenter = centerCoords.x + mySVG.offsetWidth / 2;
      caretPos = caretCoords.x + usernameCoords.x;

      dFromC = screenCenter - caretPos;

      const eyeLCoords = { x: svgCoords.x + 84, y: svgCoords.y + 76 };
      const eyeRCoords = { x: svgCoords.x + 113, y: svgCoords.y + 76 };
      const noseCoords = { x: svgCoords.x + 97, y: svgCoords.y + 81 };
      const mouthCoords = { x: svgCoords.x + 100, y: svgCoords.y + 100 };
      const eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, usernameCoords.x + caretCoords.x, usernameCoords.y + 25);
      const eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
      const eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
      const eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, usernameCoords.x + caretCoords.x, usernameCoords.y + 25);
      const eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
      const eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
      const noseAngle = getAngle(noseCoords.x, noseCoords.y, usernameCoords.x + caretCoords.x, usernameCoords.y + 25);
      const noseX = Math.cos(noseAngle) * noseMaxHorizD;
      const noseY = Math.sin(noseAngle) * noseMaxVertD;
      const mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, usernameCoords.x + caretCoords.x, usernameCoords.y + 25);
      const mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
      const mouthY = Math.sin(mouthAngle) * noseMaxVertD;
      const mouthR = Math.cos(mouthAngle) * 6;
      const chinX = mouthX * 0.8;
      const chinY = mouthY * 0.5;
      let chinS = 1 - (dFromC * 0.15) / 100;
      if (chinS > 1) {
        chinS = 1 - (chinS - 1);
      }
      const faceX = mouthX * 0.3;
      const faceY = mouthY * 0.4;
      const faceSkew = Math.cos(mouthAngle) * 5;
      const eyebrowSkew = Math.cos(mouthAngle) * 25;
      const outerEarX = Math.cos(mouthAngle) * 4;
      const outerEarY = Math.cos(mouthAngle) * 5;
      const hairX = Math.cos(mouthAngle) * 6;
      const hairS = 1.2;

      gsap.to(eyeL, { duration: 1, x: -eyeLX, y: -eyeLY, ease: "expo.out" });
      gsap.to(eyeR, { duration: 1, x: -eyeRX, y: -eyeRY, ease: "expo.out" });
      gsap.to(nose, { duration: 1, x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: "expo.out" });
      gsap.to(mouth, { duration: 1, x: -mouthX, y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: "expo.out" });
      gsap.to(chin, { duration: 1, x: -chinX, y: -chinY, scaleY: chinS, ease: "expo.out" });
      gsap.to(face, { duration: 1, x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: "expo.out" });
      gsap.to(eyebrow, { duration: 1, x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: "center top", ease: "expo.out" });
      gsap.to(outerEarL, { duration: 1, x: outerEarX, y: -outerEarY, ease: "expo.out" });
      gsap.to(outerEarR, { duration: 1, x: outerEarX, y: outerEarY, ease: "expo.out" });
      gsap.to(earHairL, { duration: 1, x: -outerEarX, y: -outerEarY, ease: "expo.out" });
      gsap.to(earHairR, { duration: 1, x: -outerEarX, y: outerEarY, ease: "expo.out" });
      gsap.to(hair, { duration: 1, x: hairX, scaleY: hairS, transformOrigin: "center bottom", ease: "expo.out" });

      document.body.removeChild(div);
    };

    const onUsernameInput = (event: Event) => {
      getCoord();
      const value = (event.target as HTMLInputElement).value;
      curUsernameIndex = value.length;

      if (curUsernameIndex > 0) {
        if (mouthStatus === "small") {
          mouthStatus = "medium";
          gsap.to([mouthBG, mouthOutline, mouthMaskPath], { duration: 1, morphSVG: mouthMediumBG, shapeIndex: 8, ease: "expo.out" });
          gsap.to(tooth, { duration: 1, x: 0, y: 0, ease: "expo.out" });
          gsap.to(tongue, { duration: 1, x: 0, y: 1, ease: "expo.out" });
          gsap.to([eyeL, eyeR], { duration: 1, scaleX: 0.85, scaleY: 0.85, ease: "expo.out" });
        }
        if (value.includes("@")) {
          mouthStatus = "large";
          gsap.to([mouthBG, mouthOutline, mouthMaskPath], { duration: 1, morphSVG: mouthLargeBG, ease: "expo.out" });
          gsap.to(tooth, { duration: 1, x: 3, y: -2, ease: "expo.out" });
          gsap.to(tongue, { duration: 1, y: 2, ease: "expo.out" });
          gsap.to([eyeL, eyeR], { duration: 1, scaleX: 0.65, scaleY: 0.65, ease: "expo.out", transformOrigin: "center center" });
        } else {
          mouthStatus = "medium";
          gsap.to([mouthBG, mouthOutline, mouthMaskPath], { duration: 1, morphSVG: mouthMediumBG, ease: "expo.out" });
          gsap.to(tooth, { duration: 1, x: 0, y: 0, ease: "expo.out" });
          gsap.to(tongue, { duration: 1, x: 0, y: 1, ease: "expo.out" });
          gsap.to([eyeL, eyeR], { duration: 1, scaleX: 0.85, scaleY: 0.85, ease: "expo.out" });
        }
      } else {
        mouthStatus = "small";
        gsap.to([mouthBG, mouthOutline, mouthMaskPath], { duration: 1, morphSVG: mouthSmallBG, shapeIndex: 9, ease: "expo.out" });
        gsap.to(tooth, { duration: 1, x: 0, y: 0, ease: "expo.out" });
        gsap.to(tongue, { duration: 1, y: 0, ease: "expo.out" });
        gsap.to([eyeL, eyeR], { duration: 1, scaleX: 1, scaleY: 1, ease: "expo.out" });
      }
    };

    const onUsernameFocus = (event: Event) => {
      const target = event.target as HTMLInputElement;
      target.parentElement?.classList.add("focusWithText");
      getCoord();
    };

    const onUsernameBlur = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.value === "") {
        target.parentElement?.classList.remove("focusWithText");
      }
      resetFace();
    };

    const onPasswordFocus = () => {
      coverEyes();
    };

    const onPasswordBlur = () => {
      uncoverEyes();
    };

    const coverEyes = () => {
      gsap.to(armL, { duration: 0.45, x: -93, y: 2, rotation: 0, ease: "quad.out", overwrite: "auto" });
      gsap.to(armR, { duration: 0.45, x: -93, y: 2, rotation: 0, ease: "quad.out", delay: 0.1, overwrite: "auto" });
    };

    const uncoverEyes = () => {
      gsap.to(armL, { duration: 1.35, y: 220, ease: "quad.out", overwrite: "auto" });
      gsap.to(armL, { duration: 1.35, rotation: 105, ease: "quad.out", delay: 0.1, overwrite: "auto" });
      gsap.to(armR, { duration: 1.35, y: 220, ease: "quad.out", overwrite: "auto" });
      gsap.to(armR, { duration: 1.35, rotation: -105, ease: "quad.out", delay: 0.1, overwrite: "auto" });
    };

    const resetFace = () => {
      gsap.to([eyeL, eyeR], { duration: 1, x: 0, y: 0, ease: "expo.out" });
      gsap.to(nose, { duration: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, ease: "expo.out" });
      gsap.to(mouth, { duration: 1, x: 0, y: 0, rotation: 0, ease: "expo.out" });
      gsap.to(chin, { duration: 1, x: 0, y: 0, scaleY: 1, ease: "expo.out" });
      gsap.to([face, eyebrow], { duration: 1, x: 0, y: 0, skewX: 0, ease: "expo.out" });
      gsap.to([outerEarL, outerEarR, earHairL, earHairR, hair], { duration: 1, x: 0, y: 0, scaleY: 1, ease: "expo.out" });
    };

    username.addEventListener("focus", onUsernameFocus);
    username.addEventListener("blur", onUsernameBlur);
    username.addEventListener("input", onUsernameInput);
    password.addEventListener("focus", onPasswordFocus);
    password.addEventListener("blur", onPasswordBlur);
    gsap.set(armL, { x: -93, y: 220, rotation: 105, transformOrigin: "top left" });
    gsap.set(armR, { x: -93, y: 220, rotation: -105, transformOrigin: "top right" });

    return () => {
      username.removeEventListener("focus", onUsernameFocus);
      username.removeEventListener("blur", onUsernameBlur);
      username.removeEventListener("input", onUsernameInput);
      password.removeEventListener("focus", onPasswordFocus);
      password.removeEventListener("blur", onPasswordBlur);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";
    await login(username, password);
  };

  return (
    <div className='yeti-login-page'>
      <form ref={formRef} className='space-y-4 p-10 border-2 border-primary rounded-lg yeti-login-form' onSubmit={handleSubmit}>
        <div className='svgContainer'>
          <div dangerouslySetInnerHTML={{ __html: memoizedSvg }} />
        </div>

        <h1 className='font-semibold text-2xl text-center uppercase'>Đăng nhập</h1>

        <div className='space-y-2'>
          <Label htmlFor='username'>Tên đăng nhập</Label>
          <Input ref={usernameRef} type='text' id='username' className='px-4 py-3 border-primary min-w-[300px]' maxLength={256} />
          <span className='indicator'></span>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Mật khẩu</Label>
          <Input ref={passwordRef} type='password' className='px-4 py-3 border-primary min-w-[300px]' id='password' />
        </div>

        <div className='grid'>
          <AppButton
            id='login'
            type='submit'
            className='bg-primary hover:bg-primary/80 mt-4 py-3 focus:ring-4 focus:ring-primary-light/50 font-semibold text-white'>
            Đăng nhập
          </AppButton>
        </div>
      </form>
    </div>
  );
}
