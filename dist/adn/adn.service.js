"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxesService = void 0;
const common_1 = require("@nestjs/common");
let BoxesService = class BoxesService {
    async isMutant(dna) {
        let isMutant = false;
        const dnaRows = dna.length;
        const dnaCols = dna[0].length;
        let consecutive_gen_sequences = 0;
        for (let i = 0; i < dnaRows && consecutive_gen_sequences <= 1; i++) {
            let count = 0;
            let last_gen = '';
            for (let j = 0; j < dnaCols && consecutive_gen_sequences <= 1; j++) {
                if (dna[i][j] === last_gen) {
                    count++;
                    if (count === 4) {
                        consecutive_gen_sequences++;
                        count = 0;
                        last_gen = '';
                    }
                }
                else {
                    last_gen = dna[i][j];
                }
            }
        }
        if (consecutive_gen_sequences > 1) {
            isMutant = true;
        }
        return isMutant;
    }
};
BoxesService = __decorate([
    (0, common_1.Injectable)()
], BoxesService);
exports.BoxesService = BoxesService;
//# sourceMappingURL=adn.service.js.map