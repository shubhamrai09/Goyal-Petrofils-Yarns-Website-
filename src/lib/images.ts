import type { StaticImageData } from "next/image";

import heroSpools from "@/assets/images/hero-spools-machine.jpg";
import spinningBobbins from "@/assets/images/spinning-bobbins.jpg";
import pastelCones from "@/assets/images/pastel-cones.jpg";
import hosieryYarn from "@/assets/images/hosiery-yarn.jpg";
import carpetYarn from "@/assets/images/carpet-yarn.jpg";
import dyedThreadRack from "@/assets/images/dyed-thread-rack.jpg";
import windingFactory from "@/assets/images/winding-factory.jpg";
import yarnSkeins from "@/assets/images/yarn-skeins-colour.jpg";
import coneWarehouse from "@/assets/images/cone-warehouse.jpg";
import millAisle from "@/assets/images/mill-aisle.jpg";
import factoryFloor from "@/assets/images/factory-floor.jpg";
import factoryTeal from "@/assets/images/factory-machines-teal.jpg";
import windingMachines from "@/assets/images/winding-machines.jpg";
import handThreadReel from "@/assets/images/hand-thread-reel.jpg";
import whiteSpools from "@/assets/images/white-spools-rack.jpg";
import loomThreads from "@/assets/images/loom-threads.jpg";
import handKnitting from "@/assets/images/hand-knitting-yarn.jpg";
import chunkyTexture from "@/assets/images/chunky-texture.jpg";
import crochetFabric from "@/assets/images/crochet-fabric.jpg";
import crochetSquares from "@/assets/images/crochet-squares.jpg";
import decorativeTassels from "@/assets/images/decorative-tassels.jpg";
import wovenTexture from "@/assets/images/woven-texture.jpg";
import blendedYarn from "@/assets/images/blended-yarn.jpg";
import creamYarnKnit from "@/assets/images/cream-yarn-knit.jpg";
import yarnConesShelf from "@/assets/images/yarn-cones-shelf.jpg";
import yarnBallsNeedles from "@/assets/images/yarn-balls-needles.jpg";
import pastelYarnTable from "@/assets/images/pastel-yarn-table.jpg";
import rangolicDiya from "@/assets/images/rangoli-diya.jpg";

export type Photo = { src: StaticImageData; alt: string };

/**
 * Licensed Unsplash photography (see docs/image-credits.md).
 * Alt text describes what is actually in the frame; none of these show GeeTex's own plant.
 */
export const photos = {
  hero: { src: heroSpools, alt: "Rows of colourful yarn spools feeding a textile machine" },
  spinning: { src: spinningBobbins, alt: "A row of white bobbins on a spinning frame" },
  pastelCones: { src: pastelCones, alt: "Close-up of pastel-coloured yarn cones packed side by side" },
  hosiery: { src: hosieryYarn, alt: "Rows of hosiery yarn skeins in many colours laid out on a rustic wooden table" },
  carpet: { src: carpetYarn, alt: "Square rainbow-striped crochet rug with tassels on a wooden floor between two sofas" },
  dyedRack: { src: dyedThreadRack, alt: "Racks of dyed yarn cones in graded colours" },
  winding: { src: windingFactory, alt: "Yarn packages stacked above a winding line on a factory floor" },
  skeins: { src: yarnSkeins, alt: "Coiled skeins of yarn in many colours, seen from above" },
  coneWarehouse: { src: coneWarehouse, alt: "Store shelves stocked with dyed yarn cones sorted by colour" },
  millAisle: { src: millAisle, alt: "A long aisle between rows of spinning machines in a yarn mill" },
  factoryFloor: { src: factoryFloor, alt: "A bright, modern textile processing hall with overhead ducting" },
  factoryTeal: { src: factoryTeal, alt: "Large textile processing machines on a clean factory floor" },
  windingMachines: { src: windingMachines, alt: "A line of automatic yarn winding machines" },
  handThread: { src: handThreadReel, alt: "A worker's hand guiding white yarn onto a reel" },
  whiteSpools: { src: whiteSpools, alt: "White yarn packages mounted on a blue creel" },
  loom: { src: loomThreads, alt: "Close-up of warp threads running through an industrial loom" },
  handKnitting: { src: handKnitting, alt: "Balls of hand-knitting yarn in blue, orange and cream with knitting needles" },
  chunky: { src: chunkyTexture, alt: "Close-up of a chunky, textured knit in pastel shades" },
  crochet: { src: crochetFabric, alt: "Close-up of crocheted fabric in coral, blue and turquoise" },
  crochetSquares: { src: crochetSquares, alt: "Crocheted flower squares with a ball of orange yarn and a hook" },
  tassels: { src: decorativeTassels, alt: "Rows of colourful decorative tassels" },
  woven: { src: wovenTexture, alt: "Close-up of a dense woven textile with loose yarn ends" },
  blended: { src: blendedYarn, alt: "Balls of yarn in magenta, green, grey and pink" },
  cream: { src: creamYarnKnit, alt: "Soft cream-coloured yarn balls resting on a knitted throw" },
  yarnConesShelf: { src: yarnConesShelf, alt: "Shelves of colourful yarn cones in a wide range of shades" },
  yarnBallsNeedles: { src: yarnBallsNeedles, alt: "Colourful yarn balls with bamboo circular knitting needles" },
  pastelYarnTable: { src: pastelYarnTable, alt: "Pastel yarn skeins and a work-in-progress knitting project on a wooden table with flowers" },
  rangolicDiya: { src: rangolicDiya, alt: "Vibrant rangoli flower decoration with diya lamps for festive occasions" },
} satisfies Record<string, Photo>;
