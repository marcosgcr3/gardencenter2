import { Plant } from "./plants";

export interface PlantTranslation {
  name: string;
  description: string;
  characteristics: string[];
  care: string;
  diseases: string;
  watering: {
    summer: string;
    winter: string;
    general: string;
  };
  light: string;
  temperature: string;
  humidity: string;
  funFact: string;
}

export const plantsEn: Record<string, PlantTranslation> = {
  "monstera-deliciosa": {
    name: "Monstera (Swiss Cheese Plant)",
    description: "One of the most popular and recognizable indoor plants, loved for its large, split green leaves. It brings an instant exotic and tropical feel to any room.",
    characteristics: [
      "Large leaves with characteristic holes and cuts (fenestrations).",
      "Climbing growth habit, benefits from a moss pole.",
      "Purifies the air by removing common household toxins.",
      "Can reach 2 to 3 meters tall indoors."
    ],
    care: "Place in a bright spot but out of direct sunlight. Wipe dust off leaves regularly with a damp cloth to help photosynthesis and spray with warm water to maintain humidity.",
    diseases: "Sensitive to mealybugs and spider mites if the environment is too dry. Too much water causes root rot (yellow leaves and soft stems).",
    watering: {
      summer: "1-2 times a week, allowing the top half of the soil to dry.",
      winter: "Every 10-14 days, reducing watering to a minimum while the soil remains moist.",
      general: "Water moderately. Always check that the soil is dry before watering again."
    },
    light: "Bright indirect light or partial shade. Avoid direct sun as it burns the leaves.",
    temperature: "18°C - 27°C (does not tolerate cold below 10°C)",
    humidity: "Medium - High (50% - 70%)",
    funFact: "In its natural habitat, it produces a delicious fruit tasting like pineapple and banana, but it takes over a year to ripen."
  },
  "palmera-canaria": {
    name: "Canary Island Date Palm",
    description: "A majestic and large-sized palm tree, symbol of the Canary Islands. It is highly popular in Mediterranean landscaping on the Costa del Sol for its resilience and elegant crown.",
    characteristics: [
      "Robust and columnar trunk decorated with the remains of pruned fronds.",
      "Dense crown composed of numerous dark green pinnate leaves (fronds).",
      "Slow to moderate growth but with great longevity.",
      "Very resistant to coastal wind and salinity."
    ],
    care: "Requires ample space for proper development. It is ideal for planting in full sun. Although drought-tolerant once established, it thrives with regular watering in warm climates.",
    diseases: "Its main threat is the Red Palm Weevil (Rhynchophorus ferrugineus), a beetle that attacks the palm's crown. Requires periodic preventive treatments.",
    watering: {
      summer: "Weekly deep watering.",
      winter: "Very spaced watering, only every 15 or 20 days in the absence of rain.",
      general: "Deep but well-drained watering. Does not tolerate continuous waterlogging."
    },
    light: "Full sun. Requires maximum luminosity.",
    temperature: "-5°C to 45°C",
    humidity: "Tolerates low humidity and salty winds",
    funFact: "It is a living fossil that has survived since the dinosaur era with almost no evolutionary changes."
  },
  "ficus-lira": {
    name: "Ficus Lyrata (Fiddle-Leaf Fig)",
    description: "With its impressive large, glossy, fiddle-shaped leaves, this ficus is a favorite of interior designers for creating a sculptural visual statement.",
    characteristics: [
      "Enormous leaves of leathery texture with prominent veins.",
      "Upright growth habit mimicking a small indoor tree.",
      "Great capacity to absorb harmful substances from the air.",
      "Slow but highly striking growth."
    ],
    care: "Location with abundant indirect light. Rotate the plant 90 degrees every few weeks so it grows evenly. Avoid cold drafts and sudden temperature changes.",
    diseases: "Sudden leaf drop due to drafts or lack of light. Brown spots on leaves usually indicate excessive moisture or fungal infections.",
    watering: {
      summer: "Every 7-9 days when the first couple of centimeters of soil are dry.",
      winter: "Every 15-20 days, spacing waterings much more.",
      general: "Water with room temperature water. Drain the bottom saucer well after watering."
    },
    light: "Bright indirect light. Direct sun can burn its leaves.",
    temperature: "16°C - 24°C (sensitive to drops below 12°C)",
    humidity: "Medium - High (needs occasional spraying)",
    funFact: "Its leaves are so large and rigid that in some West African cultures they were traditionally used to make temporary roofs."
  },
  "olivo": {
    name: "Olive Tree",
    description: "The iconic tree of the Mediterranean. Its twisted trunk and silvery gray-green leaves bring a rustic, elegant, and historic touch to any patio or garden.",
    characteristics: [
      "Evergreen, lance-shaped leaves, olive green on top and silvery underneath.",
      "Gnarled and twisted trunk that gains beauty over the years.",
      "Produces edible olives if it receives enough hours of sun and ripening.",
      "Highly resistant to heat, drought, and dry winds."
    ],
    care: "Requires soil with excellent drainage (sandy or rocky) and full sun. Can be grown in large pots for many years before being transplanted into direct ground.",
    diseases: "Sensitive to peacock spot fungus in excessively humid environments and to repilo. Common pests like olive fruit fly and scale insects.",
    watering: {
      summer: "Moderate, every 5-7 days if in a pot; fortnightly if in the ground.",
      winter: "Almost none if planted in the ground; monthly if in a pot.",
      general: "Let the substrate dry completely between waterings. Extremely drought tolerant."
    },
    light: "Full direct sun (minimum 6 hours daily).",
    temperature: "Resists frosts down to -10°C and high temperatures over 40°C",
    humidity: "Low (prefers dry climates)",
    funFact: "There are olive trees in the Mediterranean that are over 2,000 years old and still produce olives perfectly."
  },
  "buganvilla": {
    name: "Bougainvillea",
    description: "A spectacular climber known for its brilliant blooms in shades of fuchsia, orange, red, or white, which blanket facades, pergolas, and walls of the Costa del Sol in color.",
    characteristics: [
      "Vigorous climbing growth equipped with thorns.",
      "Small true flowers surrounded by showy, intensely colored bracts.",
      "Abundant flowering from spring to autumn in warm climates.",
      "Develops woody, bushy branches."
    ],
    care: "Place in the sunniest area available to maximize flowering. Needs supports or guides to climb. It is advisable to prune it at the end of winter to stimulate new shoots.",
    diseases: "Aphids and mealybugs on young shoots. Too much water can cause chlorosis (yellow leaves) and total drop of flower bracts.",
    watering: {
      summer: "1-2 times a week (more frequent in pots).",
      winter: "Scant watering, every 2-3 weeks (suspend if it rains).",
      general: "Avoid waterlogging. It prefers passing thirst to overwatering to bloom with more strength."
    },
    light: "Full direct sun indispensable for flowering.",
    temperature: "Sensitive to heavy frosts (withstands down to 0°C briefly)",
    humidity: "Low - Medium",
    funFact: "The colorful parts that look like petals are not flowers, but 'bracts' (modified leaves) that protect the tiny internal white flowers."
  },
  "sansevieria": {
    name: "Sansevieria (Snake Plant / Mother-in-Law's Tongue)",
    description: "Considered one of the most resilient indoor plants in the world. It is ideal for beginners and stands out for its vertical sword-shaped leaves with yellow edges.",
    characteristics: [
      "Stiff, fleshy, upright leaves with crossbands of green and yellow tones.",
      "Excellent air purifier recognized by NASA.",
      "Survives in very low light conditions and lack of water.",
      "Slow growth and shallow roots."
    ],
    care: "The only serious mistake with Sansevieria is overwatering. Use a porous substrate special for cacti and ensure the pot drains excess water perfectly.",
    diseases: "Stem or root rot due to excessive moisture. Leaves become soft and wrinkled.",
    watering: {
      summer: "Every 15-20 days, making sure the soil is completely dry.",
      winter: "Once a month or even less.",
      general: "Water very sparingly, letting the soil dry completely between applications."
    },
    light: "Tolerates from partial shade or dark areas to filtered direct sun.",
    temperature: "15°C - 30°C (does not tolerate frost)",
    humidity: "Low (adapts well to dry heating air)",
    funFact: "It is capable of performing photosynthesis at night (via CAM), releasing oxygen while you sleep, making it ideal for the bedroom."
  },
  "aloe-vera": {
    name: "Aloe Vera",
    description: "Famous for the medicinal and moisturizing properties of the gel contained in its fleshy leaves. It is an essential element in rock gardens and sunny terraces.",
    characteristics: [
      "Succulent leaves grouped in dense rosettes, grayish-green with spiny edges.",
      "Produces hanging yellow flowers on vertical spikes during spring.",
      "The inner gel relieves burns, cuts, and skin irritations.",
      "Easy propagation via offsets that sprout at the base."
    ],
    care: "Grow in wide, shallow pots with a substrate mixed with sand or perlite. Place in areas with direct sunlight and prevent water from accumulating in the center of the rosette.",
    diseases: "Black spots caused by fungi due to excessive moisture and root mealybugs.",
    watering: {
      summer: "Every 10-12 days, when the substrate feels dry.",
      winter: "Every 30-40 days. Do not water if the temperature drops below 10°C.",
      general: "Avoid waterlogging; the leaves act as a long-term water reserve."
    },
    light: "Full sun or very bright light.",
    temperature: "10°C to 35°C (does not tolerate severe frost)",
    humidity: "Low (very resistant to dryness)",
    funFact: "Ancient Egyptians called it 'the plant of immortality' and Queen Cleopatra used it in her daily beauty rituals."
  },
  "cinta": {
    name: "Spider Plant",
    description: "A classic hanging plant very easy to grow, with arching leaves with white stripes that produces small offsets (pups) hanging gracefully from elongated stems.",
    characteristics: [
      "Ribbon-like, thin, elongated green leaves with a white central band.",
      "Produces long stems (stolons) with small flowers and hanging plantlets.",
      "Fleshy tuberous roots that store large amounts of water.",
      "Highly effective at removing carbon monoxide indoors."
    ],
    care: "Ideal for hanging baskets or high shelves. Prefers moderate indirect light. If leaf tips turn dry or dark, it is usually due to lack of ambient humidity.",
    diseases: "Brown tips from dry air or excess salts from water. Occasionally aphids or mealybugs.",
    watering: {
      summer: "2 times a week to keep the substrate slightly damp.",
      winter: "Every 7-10 days, letting the soil surface dry.",
      general: "Regular watering without waterlogging. Its roots store water, tolerating neglect."
    },
    light: "Moderate to bright indirect light. Tolerates partial shade.",
    temperature: "12°C - 24°C",
    humidity: "Medium (appreciates spraying in summer)",
    funFact: "It is one of the best air purifiers: a single plant can clear carbon monoxide from a medium room in 24 hours."
  },
  "lavanda": {
    name: "Lavender",
    description: "The aromatic plant par excellence of the Mediterranean climate. Its purple spikes perfume the garden and attract a large number of beneficial pollinators like bees and butterflies.",
    characteristics: [
      "Compact shrub with grayish foliage and a very characteristic sweet scent.",
      "Violet flowers grouped in dense terminal spikes.",
      "Narrow and aromatic leaves ideal for drying and scenting closets.",
      "Great tolerance to intense sun and poor soils."
    ],
    care: "Plant in calcareous soil with excellent drainage; excess moisture in the soil is fatal to lavender. Prune lightly after flowering to maintain its compact shape.",
    diseases: "Root rot from fungi if the soil waterlogs or if planted in very shady areas.",
    watering: {
      summer: "Every 5-7 days in pots; fortnightly in direct ground.",
      winter: "Only in case of prolonged drought (every 20-30 days).",
      general: "Scant watering direct to the soil, avoiding wetting the leaves to prevent fungi."
    },
    light: "Full direct sun (minimum 6 hours a day).",
    temperature: "-10°C to 40°C",
    humidity: "Low (dry and airy environments)",
    funFact: "Its scent reduces heart rate and blood pressure, helping to combat insomnia and anxiety naturally."
  },
  "poto": {
    name: "Pothos",
    description: "A classic and indestructible indoor hanging plant. With its heart-shaped leaves of variegated green and yellow tones, it adapts to almost any corner of the house.",
    characteristics: [
      "Heart-shaped leaves with green and golden yellow variegation.",
      "Extremely fast creeping or climbing growth.",
      "Capable of surviving with artificial office lighting.",
      "Easy to propagate in a glass of water in a few days."
    ],
    care: "Water only when the soil has dried. If stems grow too long and lose leaves at the base, you can prune them to get a bushier plant and start new cuttings.",
    diseases: "Root rot if the substrate remains waterlogged. Mealybugs in the stem joints.",
    watering: {
      summer: "Every 5-7 days, checking that the top layer of the substrate is dry.",
      winter: "Every 10-12 days, letting the soil dry almost completely.",
      general: "It is better to underwater than to overwater. Its limp leaves warn that it is thirsty."
    },
    light: "Bright indirect light (maintains yellow color better) to medium shade.",
    temperature: "15°C - 26°C",
    humidity: "Medium (tolerates low humidity)",
    funFact: "It is known as the 'money plant' in several Asian countries because it is associated with attracting good fortune and wealth."
  },
  "rosal": {
    name: "Rose Bush",
    description: "The queen of garden flowers. Its fragrant blooms fill the beds with beauty and color for much of the year, with endless shrub, climbing, and miniature varieties.",
    characteristics: [
      "Branches provided with sharp thorns bearing multi-petaled flowers.",
      "Wide range of colors and delicious aromas depending on the variety.",
      "Requires drastic annual pruning in late winter to bloom with vigor.",
      "Deciduous or semi-deciduous bright green serrated leaves."
    ],
    care: "Needs a very sunny position and organic fertilizers rich in nutrients in spring and summer. Correct pruning in late winter is vital to ensure a spectacular bloom.",
    diseases: "Highly susceptible to pests like green aphids and fungal diseases like Powdery Mildew and Downy Mildew. Requires treatments with organic fungicides.",
    watering: {
      summer: "2-3 times a week, with deep watering at the foot of the plant without wetting the leaves.",
      winter: "Weekly or fortnightly depending on rain.",
      general: "Keep the substrate moist but not soggy, always avoiding wetting the foliage."
    },
    light: "Full direct sun (minimum 6 hours daily).",
    temperature: "-15°C to 38°C (tolerates winter frosts)",
    humidity: "Medium (prefers good air circulation)",
    funFact: "Wild rose fossils prove that this flower has existed on Earth for more than 35 million years."
  },
  "echeveria": {
    name: "Echeveria",
    description: "Small Mexican succulent plant with a perfect blue-gray rosette shape. Ideal for creating small geometric arrangements in clay pots on your balcony or terrace.",
    characteristics: [
      "Growth in tight, highly symmetrical rosettes with fleshy leaves covered in silver farina.",
      "Produces pink flower stalks with small red and yellow bell-shaped flowers.",
      "Excellent water storage in leaves to survive long periods of drought.",
      "Generates small offsets around it."
    ],
    care: "Place in full sun to maintain the compact shape of the rosette; lack of light will cause the plant to stretch (etiolate), losing its beauty. Always water from below without wetting the leaves.",
    diseases: "Rot from overwatering and mealybug in the crevices of the rosettes.",
    watering: {
      summer: "Every 7-10 days, making sure the soil is completely dry.",
      winter: "Almost none, once a month or suspend completely in cold weather.",
      general: "Water by immersion or with a fine nozzle, avoiding water accumulation in the center of the rosette."
    },
    light: "Full direct sun or bright filtered light.",
    temperature: "5°C to 35°C (protect from heavy frosts)",
    humidity: "Low (very sensitive to persistent ambient humidity)",
    funFact: "Its thin layer of whitish powder on the leaves (epicuticular wax) acts as a natural sunscreen against burns and repels water."
  },
  "helecho-espada": {
    name: "Sword Fern",
    description: "With its arching and lush bright green fronds, this hanging fern is perfect for bringing freshness and a natural touch to bright bathrooms and shaded living rooms.",
    characteristics: [
      "Long, narrow fronds divided into small, slightly curled leaflets.",
      "Dense growth with a feathery, hanging appearance.",
      "Excellent capacity to purify formaldehydes from the air.",
      "Does not produce flowers; reproduces by spores or division."
    ],
    care: "Needs constant high ambient humidity. Spray its leaves daily with distilled water or place it on a tray with pebbles and water. Avoid placing it near heaters.",
    diseases: "Dry foliage and leaf drop if the air is too dry. Scale insects and mites if conditions are not optimal.",
    watering: {
      summer: "2-3 times a week to keep the substrate uniformly moist but not soggy.",
      winter: "Every 7-9 days, reducing the frequency but not letting the soil dry out completely.",
      general: "Keep the substrate slightly damp continuously. Avoid letting it dry out completely."
    },
    light: "Filtered indirect light or partial shade. Never direct sun.",
    temperature: "15°C - 24°C (sensitive to extreme cold)",
    humidity: "High (minimum 60%)",
    funFact: "It is a prehistoric plant that has no flowers or seeds; it reproduces magically through spores on the underside of its leaves."
  },
  "hibisco": {
    name: "Hibiscus (China Rose)",
    description: "Tropical shrub with spectacular and ephemeral funnel-shaped flowers with prominent stamens. Decorates many Mediterranean coastal gardens thanks to its continuous blooming.",
    characteristics: [
      "Glossy dark green leaves, oval and slightly serrated.",
      "Large flowers of striking colors (red, yellow, pink) with a long staminal tube.",
      "Each individual flower lasts only one day, but it constantly produces buds.",
      "Shrubby habit that can reach 2 to 4 meters tall outdoors."
    ],
    care: "Plant in areas sheltered from cold wind and in full sun. Fertilize regularly during its growth period with a fertilizer rich in potassium to promote continuous blooming.",
    diseases: "Aphids and whitefly infestations on tender shoots. Flower bud drop due to lack of nutrients or irregular watering.",
    watering: {
      summer: "Frequent watering, every 2 days on hot days to keep the soil fresh.",
      winter: "Every 7-10 days, letting the surface dry slightly.",
      general: "Generous watering but with excellent drainage. Avoid letting the soil dry out completely in summer."
    },
    light: "Full direct sun (minimum 5-6 hours a day to bloom well).",
    temperature: "10°C to 35°C (does not tolerate prolonged frosts)",
    humidity: "Medium - High",
    funFact: "In Hawaii, if a woman wears a hibiscus flower behind her left ear, it means she is looking for a partner."
  },
  "kentia": {
    name: "Kentia Palm",
    description: "The most elegant and sought-after indoor palm. Its slender stature and arching fronds add sophistication and an exotic touch to spacious living rooms and offices.",
    characteristics: [
      "Elegant dark green matte fronds supported by thin stems.",
      "Very slender vertical growth, ideal for corners of rooms.",
      "Very tolerant to low light indoors compared to other palms.",
      "Very slow growth, which makes it a highly valued plant."
    ],
    care: "Place in a spot with medium indirect light. Tolerates partial shade. Avoid direct sun which yellows its leaves. Does not support excess water at the base of the pot.",
    diseases: "Brown tips due to dry air or salt accumulation. Spider mites on the underside of leaves if the environment is very hot and dry.",
    watering: {
      summer: "Every 7-9 days, letting the upper half of the substrate dry.",
      winter: "Every 15-20 days. Water only when the soil is almost dry.",
      general: "Avoid waterlogging at all costs. Use pots with excellent drainage."
    },
    light: "Bright indirect light to moderate partial shade.",
    temperature: "14°C - 25°C (supports occasional drops down to 10°C)",
    humidity: "Medium",
    funFact: "It is native only to the remote Lord Howe Island in Australia and was the favorite plant of Queen Victoria's drawing rooms."
  },
  "arbol-de-jade": {
    name: "Jade Tree",
    description: "A very long-lived succulent of tree-like appearance traditionally associated with prosperity and good fortune. It has fleshy, shiny leaves that resemble jade stones.",
    characteristics: [
      "Thick woody trunk and fleshy branches resembling a natural bonsai.",
      "Oval, thick, bright green leaves, sometimes with reddish edges in the sun.",
      "Produces small clusters of white or pink star-shaped flowers.",
      "Extreme ability to tolerate prolonged drought."
    ],
    care: "Grow in substrate with a very porous mineral base and in pots heavy enough to prevent it from tipping over. Water only when you notice the leaves lose turgidity or the soil is dry.",
    diseases: "Stem rot from fungi if overwatered. Mealybugs in the leaf axils.",
    watering: {
      summer: "Every 10-14 days, ensuring complete drying between waterings.",
      winter: "Once a month, reducing to zero in months of intense cold.",
      general: "Apply the rule of 'less is more'. If the trunk or leaves soften, it indicates excess water."
    },
    light: "Full sun or very bright direct light.",
    temperature: "10°C to 35°C (does not tolerate frosts below 5°C)",
    humidity: "Low (dry environments)",
    funFact: "It can live for over 100 years if well cared for, passing from generation to generation as a prized family heirloom."
  },
  "espatifilo": {
    name: "Peace Lily",
    description: "Very rewarding indoor plant known for its elegant white sail-shaped flowers. It is excellent at purifying the air and visibly warns when it needs water by drooping its leaves.",
    characteristics: [
      "Bright green lanceolate leaves that grow directly from the base.",
      "Flowers composed of a white spathe and a cream-colored central spadix.",
      "One of the best purifying plants according to NASA.",
      "Blooms easily indoors if it receives enough light."
    ],
    care: "Keep away from direct sun which wilts its leaves. It is a plant that warns by dropping all its leaves when it is thirsty; upon watering, it raises them again in a couple of hours.",
    diseases: "Dry tips due to lack of humidity. Root rot if the bottom of the pot waterlogs.",
    watering: {
      summer: "2 times a week, keeping the soil slightly damp.",
      winter: "Every 7-10 days, letting the soil surface dry.",
      general: "Regular watering. Appreciates constant spraying on its green leaves (avoiding flowers)."
    },
    light: "Medium to bright indirect light. Tolerates low light.",
    temperature: "16°C - 24°C (sensitive to cold under 12°C)",
    humidity: "High (appreciates frequent spraying)",
    funFact: "It is known as the drama plant because when it is thirsty it droops completely, only to resurrect hours after watering."
  },
  "calatea": {
    name: "Calathea (Peacock Plant)",
    description: "Called the zebra plant because of the spectacular geometric pattern painted on its leaves, which have a purple underside. It folds its leaves upward during the night.",
    characteristics: [
      "Oval leaves with a pattern of dark green spots on a light green background.",
      "Underside of the leaves is a striking purple color.",
      "Nyctinastic movement: folds its leaves upward at night (seems to pray).",
      "Non-toxic plant and safe for pets."
    ],
    care: "Requires partial shade or filtered indirect light (sun erases its beautiful drawings) and constant high humidity. Water preferably with rain or non-calcareous mineral water.",
    diseases: "Dry tips and leaf curling if air humidity drops. Very sensitive to chlorine in tap water.",
    watering: {
      summer: "2 times a week, trying to keep the substrate constantly damp but not soggy.",
      winter: "Every 7-9 days, reducing the amount of water but not letting the substrate dry out completely.",
      general: "Use lime-free water at room temperature. Keep substrate fresh constantly."
    },
    light: "Partial shade or very soft filtered indirect light.",
    temperature: "18°C - 24°C (never below 15°C)",
    humidity: "High (minimum 60% - 70%)",
    funFact: "At night, its leaves close vertically upwards like hands in prayer, and open again at dawn."
  },
  "geranio": {
    name: "Geranium",
    description: "The classic plant of Andalusian balconies and patios. Its clusters of vibrantly colored flowers are synonymous with joy and tolerate the intense Andalusian sun excellently.",
    characteristics: [
      "Rounded, velvety leaves with a characteristic scent.",
      "Flowers grouped in showy umbels of red, pink, white, or bicolor.",
      "Uninterrupted flowering from spring to late autumn.",
      "Very rustic compact bushy habit."
    ],
    care: "Requires full direct sun to bloom abundantly. It is highly advisable to remove spent flowers and damaged leaves periodically to encourage new flower shoots.",
    diseases: "Its main pest is the Geranium Bronze Butterfly (Cacyreus marshalli), whose caterpillar drills stems from within. Requires treatments with specific periodic insecticides.",
    watering: {
      summer: "2-3 times a week in pots, wetting only the soil.",
      winter: "Every 10-15 days. Let the substrate dry between waterings.",
      general: "Water directly to the substrate without wetting leaves or flowers to avoid rot and fungi."
    },
    light: "Full direct sun (minimum 5-6 hours daily).",
    temperature: "5°C to 40°C (protect from heavy frosts)",
    humidity: "Low - Medium",
    funFact: "Its leaves contain essential oils that act as an effective natural repellent against mosquitoes and other annoying insects."
  },
  "romero": {
    name: "Rosemary",
    description: "Woody aromatic plant indispensable in Mediterranean cooking. Its needle-like foliage exhales a comforting aroma when brushed, and it has unmatched hardiness in coastal areas.",
    characteristics: [
      "Evergreen woody shrub with linear, leathery leaves of strong aroma.",
      "Small light blue or violet flowers grouped in the leaf axils.",
      "Culinary, medicinal, and ornamental properties.",
      "Perfectly supports extreme drought, saline soils, and coastal winds."
    ],
    care: "Cultivate in full sun and in soil with excellent drainage (rocky or sandy). It is a very rustic plant that barely requires care once established in the ground.",
    diseases: "Root rot if planted in heavy clays that retain water or if overwatered.",
    watering: {
      summer: "Every 7-10 days if in a pot; fortnightly or none if planted in the ground.",
      winter: "Only in case of extreme winter drought (every 30 days).",
      general: "Minimal watering. Check that the soil is completely dry before watering again."
    },
    light: "Full direct sun indispensable.",
    temperature: "-10°C to 45°C",
    humidity: "Low (dry and sunny environments)",
    funFact: "In ancient Greece, students wore rosemary wreaths before exams to improve their memory and concentration."
  }
};

export function getTranslatedPlant(plant: Plant, lang: string): Plant {
  if (lang === "en" && plantsEn[plant.slug]) {
    const trans = plantsEn[plant.slug];
    return {
      ...plant,
      name: trans.name,
      description: trans.description,
      characteristics: trans.characteristics,
      care: trans.care,
      diseases: trans.diseases,
      watering: {
        ...plant.watering,
        ...trans.watering
      },
      light: trans.light,
      temperature: trans.temperature,
      humidity: trans.humidity,
      funFact: trans.funFact
    };
  }
  return plant;
}
