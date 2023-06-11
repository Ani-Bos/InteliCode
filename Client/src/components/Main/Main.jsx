import { color, motion } from "framer-motion";
import { TypingText } from  "../CustomText/customText"
import styles from "../../Styles/styles";
import { fadeIn , staggerContainer } from "../../Utils/Motion";
import { white } from "tailwindcss/colors";
const Main = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText
        className="text-yellow font-extrabold"
        title="Hi Coders 👋"
        textStyles="text-center"
      />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundImage:
            "-webkit-linear-gradient(to right, #ec2F4B, #009FFF)",
          backgroundImage: "linear-gradient(to right, #ec2F4B, #009FFF)",
          color: "transparent",
        }}
      >
        <span className=" text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas sit
          delectus quidem alias, vel debitis autem repellendus beatae
          exercitationem sint, possimus doloribus ad accusamus?
        </span>
      </motion.p>
      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="./images/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default Main;
