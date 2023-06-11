import { motion } from "framer-motion";
// import { textContainer, textVariant2 } from "../utils/motion";
import { textContainer } from "../../Utils/Motion";
import { textVariant2 } from "../../Utils/Motion";
// export const TypingText = ({ title, textStyles }) => (
//   <motion.p
//     variants={textContainer}
//     className={`font-extrabold text-[24px] ${textStyles}`}
//     style={{
//       color: " #F2994A",
//       backgroundImage: "-webkit-linear-gradient(to right, #F2C94C, #F2994A)",
//       backgroundImage: " linear-gradient(to right, #F2C94C, #F2994A)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//     }}
//   >
//     {Array.from(title).map((letter, index) => (
//       <motion.span variants={textVariant2} key={index}>
//         {letter === " " ? "\u00A0" : letter}
//       </motion.span>
//     ))}
//   </motion.p>
// );

export const TypingText = ({ title, textStyles }) => (
  <motion.p
    variants={textContainer}
    className={`font-extrabold text-[24px] text-white ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);


export const TitleText = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);
