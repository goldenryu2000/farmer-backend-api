/**
 * @openapi
 * components:
 *  schemas:
 *    Country:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: "Name of the country"
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    Farmer:
 *      type: object
 *      required:
 *        - name
 *        - phone
 *        - language
 *        - country
 *      properties:
 *        name:
 *          type: string
 *          default: "John Doe"
 *        phone:
 *          type: number
 *          default: 0
 *          description: "Must be unique"
 *        language:
 *          type: string
 *          default: ""
 *        country:
 *          $ref: '#/components/schemas/Country'
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    Farm:
 *      type: object
 *      required:
 *        - area
 *        - village
 *        - sowingDate
 *      properties:
 *        area:
 *          type: number
 *        village:
 *          type: string
 *        sowingDate:
 *          type: string
 *          format: date
 *        farmer:
 *          $ref: '#/components/schemas/Farmer'
 *
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    Schedule:
 *      type: object
 *      required:
 *        - daysAfterSow
 *        - fertilizer
 *      properties:
 *        daysAfterSow:
 *          type: string
 *          format: date
 *        fertilizer:
 *          type: object
 *          properties:
 *            type:
 *              type: number
 *              description: "Type of Fertilizer: Solid or Liquid"
 *            quantity:
 *              type: number
 *              description: "Quantity of Fertilizer"
 *            quantityUnit:
 *              type: string
 *              description: "ton, kg, g for solids and L, mL for liquids"
 *        farm:
 *          $ref: '#/components/schemas/Farm'
 *
 */
