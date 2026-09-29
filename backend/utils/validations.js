const { z } = require('zod');

// Disease scanner payload validation schema
const diseaseSchema = z.object({
  userId: z.string().optional(),
  image: z.string().min(10, { message: "Image base64 data is required and must be valid." }),
  cropHint: z.string().optional()
});

// Weather advisory payload validation schema
const weatherSchema = z.object({
  userId: z.string().optional(),
  location: z.string().min(2, { message: "Location name must be at least 2 characters long." }),
  season: z.string().min(2, { message: "Season must be specified (e.g. Monsoon, Summer, Winter, Spring)." })
});

// Market timing payload validation schema
const marketSchema = z.object({
  userId: z.string().optional(),
  cropType: z.string().min(2, { message: "Crop type must be specified (e.g. Wheat, Corn, Rice, Soybeans)." }),
  yield: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z.number().positive({ message: "Estimated yield must be a positive number in metric tons." })
  )
});

module.exports = {
  diseaseSchema,
  weatherSchema,
  marketSchema
};
