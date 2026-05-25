const fs = require('fs');
let eq = fs.readFileSync('src/components/Equipo.tsx', 'utf8');

const oldBlock = `            </div>

            <a
              href="/reservar"
              className="mt-6 block text-center bg-[#C9A96E]`;

const newBlock = `            </div>

            <div className="pt-3 mt-3 border-t border-gray-100">
              <h4 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-2">
                Horario
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                {Object.entries(selected.horario || {}).map(([dia, horario]) => (
                  <div key={dia} className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-500 capitalize">{dia}</span>
                    <span className={horario ? "text-gray-700" : "text-red-300"}>
                      {horario ? horario.inicio + " - " + horario.fin : "Cerrado"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/reservar"
              className="mt-6 block text-center bg-[#C9A96E]`;

eq = eq.replace(oldBlock, newBlock);
fs.writeFileSync('src/components/Equipo.tsx', eq);
console.log('✅ Schedule added to modal');
