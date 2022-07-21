// New Farmer Route

/**
 * @openapi
 * paths:
 *  /newfarmer:
 *      post:
 *          tags:
 *              - "Create New Farmer"
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  default: "John Doe"
 *                              phone:
 *                                  type: number
 *                                  default: 123456789
 *                              language:
 *                                  type: string
 *                                  default: "English"
 *                              country:
 *                                  type: string
 *                                  default: "India"
 *                          required:
 *                              - name
 *                              - phone
 *                              - language
 *                              - country
 *          responses:
 *              201:
 *                  description: New Farmer Created
 *              400:
 *                  description: Client Error
 */

// New Farm Route
/**
 * @openapi
 * paths:
 *  /{id}/newfarm:
 *      post:
 *          tags:
 *              - "Create New Farmer"
 *          parameters:
 *              - name: id
 *                in: path
 *                description: Id of farmer (created with /newfarmer request) in which farm has to be added
 *                required: true
 *                schema:
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              area:
 *                                  type: number
 *                                  default: "100"
 *                              village:
 *                                  type: string
 *                                  default: "xyz village"
 *                              sowingDate:
 *                                  type: string
 *                                  format: date
 *                                  default: "MM/DD/YYYY"
 *                          required:
 *                              - area
 *                              - village
 *          responses:
 *              201:
 *                  description: New Farm Created
 *              400:
 *                  description: Client Error
 */

// New Schedule Route
/**
 * @openapi
 * paths:
 *  /{fid}/newschedule:
 *      post:
 *          tags:
 *              - "Create New Farmer"
 *          parameters:
 *              - name: fid
 *                in: path
 *                description: ID of the farm (created with /{id}/newfarm request) in which schedule has to be added
 *                required: true
 *                schema:
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              daysAfterSow:
 *                                  type: number
 *                                  default: "90"
 *                                  description: Number of days after sowing
 *                              fertilizer:
 *                                  type: object
 *                                  properties:
 *                                      type:
 *                                          type: string
 *                                          description: "solid or liquid"
 *                                          default: "liquid"
 *                                      quantity:
 *                                          type: number
 *                                          description: "quanitity of fertilizer"
 *                                          default: 55
 *                                      quantityUnit:
 *                                          type: string
 *                                          description: "ton, kg, g for solids and L, mL for liquids"
 *                                          default: "L"
 *                                  required:
 *                                      - type
 *                                      - quantity
 *                                      - quantityUnit
 *                          required:
 *                              - daysAfterSow
 *                              - fertilizer
 *          responses:
 *              201:
 *                  description: New Schedule Created
 *              400:
 *                  description: Client Error
 */

// ************************* Farmer Views *********************************//

/**
 * @openapi
 * paths:
 *  /views/duenow:
 *      get:
 *          tags:
 *              - "Farmer Views"
 *          responses:
 *              200:
 *                  description: Due Schedules Found
 *              404:
 *                  description: No Schedules found
 */

/**
 * @openapi
 * paths:
 *  /views/growing:
 *      get:
 *          tags:
 *              - "Farmer Views"
 *          description: Farmers who are growing crops
 *          responses:
 *              200:
 *                  description: Due Schedules Found
 *              404:
 *                  description: No Schedules found
 */

/**
 * @openapi
 * paths:
 *  /views/{sid}/scheduledue:
 *      get:
 *          tags:
 *              - "Farmer Views"
 *          description: Get When a Schedule is due by Schedule ID
 *          parameters:
 *              - name: sid
 *                in: path
 *                description: Schedule ID
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Due Schedules Found
 *              404:
 *                  description: No Schedules found
 */
