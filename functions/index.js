'use strict'
const functions = require('firebase-functions');
const { FlowApi } = require("flow-pago");
const express = require('express');
const bodyParser = require('body-parser');
const { check } = require('express-validator');

const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

const db = require('./queries');
const endpoints_tam = require('./endpoints/cla_ceo_tam')
const endpoints_us_suc = require('./endpoints/usuario_sucursal')
const endpoints_usuario = require('./endpoints/cla_ceo_usuarios')
const endpoints_sucursal = require('./endpoints/cla_ceo_sucursal')
const endpoints_cambiate = require('./endpoints/cambiate_leads')
const endpoints_cb_creditos = require('./endpoints/cb_creditos')

const login = require('./login');
const helmet = require('helmet');
const xss = require('xss-clean');
const port = 3000;

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
// Data Sanitization against XSS attacks
app.use(xss());

/*HELMET: colección de nueve funciones de middleware más 
paquetes que establecen cabeceras HTTP relacionadas con la seguridad:*/
app.use(helmet());



app.get('/empresa/:id', login.checkIfAuth, db.getEMpresa);
app.get('/empresa_credito_detalle/:id', login.checkIfAuth, db.getEMpresaCreditoDetalle);
app.get('/empresa_ahorro_detalle/:id', login.checkIfAuth, db.getEMpresaAhorroDetalle);
app.get('/empresa_beneficios/:id', login.checkIfAuth, db.getEMpresaBeneficios);
app.get('/empresa_ofertas/:id/:categoria', login.checkIfAuth, db.getEMpresaOfertas);
app.get('/afiliado/:id', login.checkIfAuth, db.getAfiliados);
app.get('/afiliado_empresa/:id', login.checkIfAuth, db.getAfiliadoEmpresa);
app.get('/afiliado_mora/:id', login.checkIfAuth, db.getAfiliadosMora);
app.get('/afiliado_aprobado/:id', login.checkIfAuth, db.getAfiliadosAprobadoPrecal);
app.get('/afiliado_auto/:id', login.checkIfAuth, db.getAfiliadosCampanaAutoTotal);
app.get('/afiliado_oferta_efi/:id', login.checkIfAuth, db.getAfiliadosOfertaEfi);
app.get('/afiliado_recomendacion_seguro/:id', login.checkIfAuth, db.getAfiliadosRecomendacionSeguro);
app.get('/afiliado_oferta_ahorro/:id', login.checkIfAuth, db.getAfiliadosOfertasAhorro);
app.get('/afiliado_oferta_bbss/:id', login.checkIfAuth, db.getAfiliadosOfertasBbss);
app.get('/afiliado_oferta_ppff', login.checkIfAuth, db.getOfertaPPFFAfiliado);
app.get('/afiliado_oferta_cbbss', login.checkIfAuth, db.getOfertaBbSSAfiliado);
app.get('/afiliado_oferta_alerta', login.checkIfAuth, db.getOfertasAlertaAfiliado);
app.get('/afiliado_cargas_familiares', login.checkIfAuth, db.getCargasFamiliaresAfiliado)
app.get('/timeline_afiliado', login.checkIfAuth, db.getTimeLineAfiliado);
app.get('/mi-ficha-credito', login.checkIfAuth, db.getCreditoMiFicha);
app.get('/mi-ficha-seguro', login.checkIfAuth, db.getSeguroMiFicha);
app.get('/mi-ficha-ahorro', login.checkIfAuth, db.getAhorroMiFicha);
app.get('/imagen-componente', login.checkIfAuth, db.getImagenesComponente);
app.post('/timeline-afiliado', login.checkIfAuth, db.insertTimelineAfiliado);
app.get('/auto-full', login.checkIfAuth, db.getAutoFullMiFicha);
app.get('/afiliado_oferta', login.checkIfAuth, db.getOfertasAfiliado);
app.get('/micartera_creditos', login.checkIfAuth, db.getMicarteraCreditos);
app.get('/micartera_creditos_gestionado', login.checkIfAuth, db.getMicarteraCreditosGestionado);
app.get('/micartera_creditos_pendientes', login.checkIfAuth, db.getMicarteraCreditosPendientes);
app.get('/micartera_creditos_total', login.checkIfAuth, db.getMicarteraCreditos_total);
app.get('/micartera_ejecutivos', login.checkIfAuth, db.getMicartera_ejecutivos);
app.get('/diasrestantes', login.checkIfAuth, db.getDiasRestantes);
app.post('/simulacion-ejecutivo', login.checkIfAuth, db.insertSimulacionEjecutivo)


app.get('/colaboradores_region/:id', login.checkIfAuth, db.getColaboradoresRegion);
app.get('/colaboradores_comuna/:id', login.checkIfAuth, db.getColaboradoresComuna);
app.get('/afiliados_comuna/:id', login.checkIfAuth, db.getAfiliadosComuna);
app.get('/colaboradores_pos/:id', login.checkIfAuth, db.getColaboradoresPosicion);
app.get('/afiliados_region/:id', login.checkIfAuth, db.getAfiliadosRegion);
app.get('/vulnerabilidad_region/:id', login.checkIfAuth, db.getVulnerabilidadRegion);
app.get('/vulnerabilidad_region_col/:id', login.checkIfAuth, db.getVulnerabilidadRegionColaborador);
app.get('/vulnerabilidad_comuna/:id', login.checkIfAuth, db.getVulnerabilidadComuna);
app.get('/vulnerabilidad_comuna_col/:id', login.checkIfAuth, db.getVulnerabilidadComunaColaborador);
app.get('/comuna_pos/:id', login.checkIfAuth, db.getComunaPos);
app.get('/contagios_covid/:id', login.checkIfAuth, db.getContagiosCovid);
app.get('/farmacias_operativas', login.checkIfAuth, db.getFarmaciasOperativas);
app.get('/diferimientos', login.checkIfAuth, db.getDiferimientos);
app.get('/getMailsEncuesta', login.checkIfAuth, db.getMailsEncuesta);
app.get('/empresa_oferta_cred_digital/:id', login.checkIfAuth, db.getOfertaCreditoDigitalEmpresa);
app.get('/colaboradores_region/:id', db.getColaboradoresRegion);
app.get('/colaboradores_comuna/:id', db.getColaboradoresComuna);
app.get('/afiliados_comuna/:id', db.getAfiliadosComuna);
app.get('/colaboradores_pos/:id', db.getColaboradoresPosicion);
app.get('/afiliados_region/:id', db.getAfiliadosRegion);
app.get('/vulnerabilidad_region/:id', db.getVulnerabilidadRegion);
app.get('/vulnerabilidad_region_col/:id', db.getVulnerabilidadRegionColaborador);
app.get('/vulnerabilidad_comuna/:id', db.getVulnerabilidadComuna);
app.get('/vulnerabilidad_comuna_col/:id', db.getVulnerabilidadComunaColaborador);
app.get('/comuna_pos/:id', db.getComunaPos);
app.get('/contagios_covid/:id', db.getContagiosCovid);
app.get('/cla_usuarios', db.getClaCeoUsuarios);
app.get('/cla_usuario', endpoints_usuario.getClaCeoUsuario);
app.delete('/cla_usuario', login.checkIfAuth, endpoints_usuario.deleteClaCeoUsuario);
app.post('/cla_usuario', endpoints_usuario.insertClaCeoUsuario);
app.put('/cla_usuario', [check('rut', 'Largo del rut deberia tener entre 10 a caracteres')
    .isLength({ min: 7, max: 10 }),
    check('nombres', 'Largo de nombres debiera ser entre 5 a 10 caracteres')
    .isLength({ min: 2, max: 30 }),
    check('usuario_actualiza', 'Usuario actualiza 8 to 10 caracteres')
    .isLength({ min: 7, max: 10 }),
    check('apellido_materno', 'Parametro requerido').isLength({ min: 3 }),
    check('apellido_paterno', 'Parametro requerido').isLength({ min: 3 }),
], db.updateClaCeoUsuario);
app.put('/cla_usuario_rol', login.checkIfAuth, db.updateClaRolUsuario)
    //CAMPAÑAS

app.get('/cla_campanas', login.checkIfAuth, db.getAllCampains)
app.post('/cla_campanas', login.checkIfAuth, db.insertCampain)
app.put('/cla_campanas', login.checkIfAuth, db.updateCampain)
app.delete('/cla_campanas', login.checkIfAuth, db.deleteCampain)

app.get('/cla_sucursales', login.checkIfAuth, db.getAllSucursales)
app.get('/cla_sucursal', login.checkIfAuth, db.getSucursalById)


app.get('/cla_campanas_tipo', login.checkIfAuth, db.getCampainsByTipo);

app.get('/cla_supervisores_campain', login.checkIfAuth, db.getSupervisoresByCampain);
app.post('/cla_supervisores_campain', login.checkIfAuth, db.insertSupervisor);
app.delete('/cla_supervisores_campain', login.checkIfAuth, db.deleteSupervisor);

app.get('/cla_colaboradores_campain', login.checkIfAuth, db.getColaboradoresByCampain);
app.post('/cla_colaboradores_campain', login.checkIfAuth, db.insertColaboradorCampain);
app.delete('/cla_colaboradores_campain', login.checkIfAuth, db.deleteColaboradorCampain);
app.put('/cla_colaboradores_campain', login.checkIfAuth, db.updateColaboradorCampain);


app.get('/cla_prioridad', login.checkIfAuth, db.getPrioridad);
app.get('/cla_colaboradores_prioridad', login.checkIfAuth, db.getColaboradorByPrioridad);
app.post('/cla_prioridad', login.checkIfAuth, db.insertOrUpdatePrioridad);
app.put('/cla_prioridad', login.checkIfAuth, db.updatePrioridad);



app.put('/cla_campanas', login.checkIfAuth, db.updateCampain)
app.get('/cla_us_sucursal', login.checkIfAuth, db.getSucursalUsuario);
app.get('/cla_us_suc_rut', login.checkIfAuth, db.getSucursalesByRutUsuario);
app.get('/cla_usuarios_sucursal', login.checkIfAuth, endpoints_us_suc.getUsuariosPorSucursal);
app.post('/cla_usuarios_sucursal', login.checkIfAuth, db.addUsuarioSucursal);
app.delete('/cla_usuarios_sucursal', login.checkIfAuth, db.deleteUsuarioSucursal);
//login.checkIfAuth

app.put('/cla_leads_usuarios', login.checkIfAuth, db.updateAsignLeads);
app.post('/cla_leads_usuarios', login.checkIfAuth, db.getLeadsByColaboradores);
app.get('/cla_leads_usuarios', login.checkIfAuth, db.getLeadsBySucursal);


app.get('/cla_usuarios_sucursal/agente', login.checkIfAuth, db.getAgentesSinSucursal);
app.post('/cla_usuarios_sucursal/agente', login.checkIfAuth, db.setAgenteSucursal);
app.get('/cla_usuarios_sucursal/buscar', login.checkIfAuth, db.getUsuariosPorCargoSuc);
app.get('/cla_usuarios_sucursal/dotacion', login.checkIfAuth, db.getDotaciones);
app.put('/cla_usuarios_sucursal/dotacion', login.checkIfAuth, db.updateDotaciones);

app.get('/cla_sucursal/v2', login.checkIfAuth, db.getSucursales)
app.get('/cla_sucursal/v2/enabled', login.checkIfAuth, db.getSucursalDisponible)
app.put('/cla_sucursal/v2/enabled', login.checkIfAuth, endpoints_us_suc.updateSucursalDestino)

app.get('/cla_ceo_sucursal/like', endpoints_sucursal.getSucursalLike)
app.get('/cla_ceo_roles', db.getRoles)

app.get('/cla_ceo_estados_leads', login.checkIfAuth, db.getEstadosLeads)
app.put('/cla_base_mensual', login.checkIfAuth, db.updateGestionBaseLead);
app.put('/cla_base_mensual_pend', login.checkIfAuth, db.updatePendienteBaseLead);

app.get('/cla_ceo_tam_personas', login.checkIfAuth, endpoints_tam.getAll);
app.get('/cla_ceo_tam/like', login.checkIfAuth, endpoints_tam.getRutLike);
app.get('/cla_ceo_tam/colaborador', login.checkIfAuth, endpoints_tam.getByMailColaborador);
app.put('/cla_ceo_tam', login.checkIfAuth, endpoints_tam.update);
app.get('/cla_ceo_tam/estado', login.checkIfAuth, endpoints_tam.getEstados)
app.put('/cla_ceo_tam/descargado', login.checkIfAuth, endpoints_tam.updateDescargados);
/*migra grilla Leads*/
app.post('/cla_ceo_leads/colaborador', login.checkIfAuth, db.getLeadsColaborador);
app.post('/cla_ceo_leads/colaborador_propenso', login.checkIfAuth, db.getLeadsPropensosColaborador);
app.get('/cla_ceo_leads', login.checkIfAuth, db.getLeadById);
app.get('/regiones', login.checkIfAuth, db.getRegiones);
app.get('/cla_campanas_usuario', login.checkIfAuth, db.getCampanasByColaborador);
app.get('/cla_campanas_supervisor', login.checkIfAuth, db.getCampanasBySupervisor);
app.put('/cla_ceo_lead_pend', login.checkIfAuth, db.updatePendienteLead);
app.put('/cla_ceo_lead', login.checkIfAuth, db.updateLead);
app.post('/cla_ceo_leads/colaborador_all', login.checkIfAuth, db.getAllLeadsColaborador);
app.post('/cla_ceo_leads/colaborador_resumen', login.checkIfAuth, db.getResumenLeadsColaborador);
app.get('/cla_ceo_leads/colaborador_top', login.checkIfAuth, db.getTop11LeadsColaborador);
app.get('/cla_ceo_leads/ejecutivos_campana', login.checkIfAuth, db.getAllEjecutivosCampana);
app.put('/cla_ceo_lead/ejecutivo_assign', login.checkIfAuth, db.updateEjecutivoLead);
app.get('/cla_ceo_lead/total', login.checkIfAuth, db.getLeads_total);
app.get('/cla_ceo_vista/cantidad', login.checkIfAuth, db.getVistaUsuario);



app.post("/apiFlow/create_order", db.create_order);

app.post("/apiFlow/payment_confirm", db.payment_confirm);

app.post("/apiFlow/result", db.api_result);

app.post("/apiFlow/create_email", db.create_email);

app.get('/planes/:isapre/:tipo', db.getPlanes);
app.get('/cla_bancos', db.getBancos);
app.post('/cla_cotizacion', db.insertCotizacion);

app.get('/cambiate_leads/banco', endpoints_cambiate.getLeadByBanco);
app.put('/cambiate_leads/asigna', endpoints_cambiate.updateAsignLeads);

app.get('/cambiate/creditos', endpoints_cb_creditos.getCreditosByRut);
app.put('/cambiate/creditos', endpoints_cb_creditos.updateCreditos);



app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

exports.apifenix = functions.https.onRequest(app);