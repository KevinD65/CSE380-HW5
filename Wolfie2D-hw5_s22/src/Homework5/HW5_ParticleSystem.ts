import { TweenableProperties } from "../Wolfie2D/Nodes/GameNode";
import Particle from "../Wolfie2D/Nodes/Graphics/Particle";
import { TweenEffect } from "../Wolfie2D/Rendering/Animations/AnimationTypes";
import ParticleSystem from "../Wolfie2D/Rendering/Animations/ParticleSystem";
import EaseFunctions, { EaseFunctionType } from "../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../Wolfie2D/Utils/RandUtils";

// HOMEWORK 5 - TODO
/**
 * This particle system extends the base ParticleSystem class, and I reccommend you look at some of the implementation, 
 * at least for the default setParticleAnimation()
 * 
 * You'll just be handling the tweens for each particle for their animation, overriding the base implementation.
 * 
 * The new particle animation add these behaviors, along with the existing setParticleAnimation behaviors:
 * 
 *  - Each particle should look like they're affected by gravity, accelerating down over the course of their lifetime. This
 *  change should also be affected by the particle's mass, meaning particles with a higher mass should fall faster.
 * 
 *  - Each particle should disappear over it's lifetime, moving from an alpha of 1 to 0.
 */
export default class HW5_ParticleSystem extends ParticleSystem {

    setParticleAnimation(particle: Particle) {
        super.setParticleAnimation(particle);
        particle.vel = RandUtils.randVec(-50, 50, -100, 100);

        let gravity = new TweenEffect();
        gravity.property = TweenableProperties.posY;
        gravity.resetOnComplete = false;
        gravity.start = 1;
        gravity.end = 10;
        gravity.ease = EaseFunctionType.IN_OUT_QUAD;

        let fadeOut = new TweenEffect();
        fadeOut.property = TweenableProperties.alpha;
        fadeOut.resetOnComplete = false;
        fadeOut.start = 1;
        fadeOut.end = 0;
        fadeOut.ease = EaseFunctionType.IN_OUT_QUAD;

        particle.tweens.add("active", {
            startDelay: 0,
            duration: this.lifetime,
            effects: [gravity, fadeOut]
        });
    }
}