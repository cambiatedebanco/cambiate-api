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



app.get('/empresa/:id', db.getEMpresa);
app.get('/empresa_credito_detalle/:id', db.getEMpresaCreditoDetalle);
app.get('/empresa_ahorro_detalle/:id', db.getEMpresaAhorroDetalle);
app.get('/empresa_beneficios/:id', db.getEMpresaBeneficios);
app.get('/empresa_ofertas/:id/:categoria', db.getEMpresaOfertas);
app.get('/afiliado/:id', db.getAfiliados);
app.get('/afiliado_empresa/:id', db.getAfiliadoEmpresa);
app.get('/afiliado_mora/:id', db.getAfiliadosMora);
app.get('/afiliado_aprobado/:id', db.getAfiliadosAprobadoPrecal);
app.get('/afiliado_auto/:id', db.getAfiliadosCampanaAutoTotal);
app.get('/afiliado_oferta_efi/:id', db.getAfiliadosOfertaEfi);
app.get('/afiliado_recomendacion_seguro/:id', db.getAfiliadosRecomendacionSeguro);
app.get('/afiliado_oferta_ahorro/:id', db.getAfiliadosOfertasAhorro);
app.get('/afiliado_oferta_bbss/:id', db.getAfiliadosOfertasBbss);
app.get('/afiliado_oferta_ppff', db.getOfertaPPFFAfiliado);
app.get('/afiliado_oferta_cbbss', db.getOfertaBbSSAfiliado);
app.get('/afiliado_oferta_alerta', db.getOfertasAlertaAfiliado);
app.get('/afiliado_cargas_familiares', db.getCargasFamiliaresAfiliado)
app.get('/timeline_afiliado', db.getTimeLineAfiliado);
app.get('/mi-ficha-credito', db.getCreditoMiFicha);
app.get('/mi-ficha-seguro', db.getSeguroMiFicha);
app.get('/mi-ficha-ahorro', db.getAhorroMiFicha);
app.get('/imagen-componente', db.getImagenesComponente);
app.post('/timeline-afiliado', db.insertTimelineAfiliado);
app.get('/auto-full', db.getAutoFullMiFicha);
app.get('/afiliado_oferta', db.getOfertasAfiliado);
app.get('/micartera_creditos', db.getMicarteraCreditos);
app.get('/micartera_creditos_gestionado', db.getMicarteraCreditosGestionado);
app.get('/micartera_creditos_pendientes', db.getMicarteraCreditosPendientes);
app.get('/micartera_creditos_total', db.getMicarteraCreditos_total);
app.get('/micartera_ejecutivos', db.getMicartera_ejecutivos);
app.get('/diasrestantes', db.getDiasRestantes);
app.post('/simulacion-ejecutivo', db.insertSimulacionEjecutivo)


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
app.get('/farmacias_operativas', db.getFarmaciasOperativas);
app.get('/diferimientos', db.getDiferimientos);
app.get('/getMailsEncuesta', db.getMailsEncuesta);
app.get('/empresa_oferta_cred_digital/:id', db.getOfertaCreditoDigitalEmpresa);
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
app.delete('/cla_usuario', endpoints_usuario.deleteClaCeoUsuario);
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
app.put('/cla_usuario_rol', db.updateClaRolUsuario)
    //CAMPAÑAS

app.get('/cla_campanas', db.getAllCampains)
app.post('/cla_campanas', db.insertCampain)
app.put('/cla_campanas', db.updateCampain)
app.delete('/cla_campanas', db.deleteCampain)

app.get('/cla_sucursales', db.getAllSucursales)
app.get('/cla_sucursal', db.getSucursalById)


app.get('/cla_campanas_tipo', db.getCampainsByTipo);

app.get('/cla_supervisores_campain', db.getSupervisoresByCampain);
app.post('/cla_supervisores_campain', db.insertSupervisor);
app.delete('/cla_supervisores_campain', db.deleteSupervisor);

app.get('/cla_colaboradores_campain', db.getColaboradoresByCampain);
app.post('/cla_colaboradores_campain', db.insertColaboradorCampain);
app.delete('/cla_colaboradores_campain', db.deleteColaboradorCampain);
app.put('/cla_colaboradores_campain', db.updateColaboradorCampain);


app.get('/cla_prioridad', db.getPrioridad);
app.get('/cla_colaboradores_prioridad', db.getColaboradorByPrioridad);
app.post('/cla_prioridad', db.insertOrUpdatePrioridad);
app.put('/cla_prioridad', db.updatePrioridad);



app.put('/cla_campanas', db.updateCampain)
app.get('/cla_us_sucursal', db.getSucursalUsuario);
app.get('/cla_us_suc_rut', db.getSucursalesByRutUsuario);
app.get('/cla_usuarios_sucursal', endpoints_us_suc.getUsuariosPorSucursal);
app.post('/cla_usuarios_sucursal', db.addUsuarioSucursal);
app.delete('/cla_usuarios_sucursal', db.deleteUsuarioSucursal);
//login.checkIfAuth

app.put('/cla_leads_usuarios', db.updateAsignLeads);
app.post('/cla_leads_usuarios', db.getLeadsByColaboradores);
app.get('/cla_leads_usuarios', db.getLeadsBySucursal);


app.get('/cla_usuarios_sucursal/agente', db.getAgentesSinSucursal);
app.post('/cla_usuarios_sucursal/agente', db.setAgenteSucursal);
app.get('/cla_usuarios_sucursal/buscar', db.getUsuariosPorCargoSuc);
app.get('/cla_usuarios_sucursal/dotacion', db.getDotaciones);
app.put('/cla_usuarios_sucursal/dotacion', db.updateDotaciones);

app.get('/cla_sucursal/v2', db.getSucursales)
app.get('/cla_sucursal/v2/enabled', db.getSucursalDisponible)
app.put('/cla_sucursal/v2/enabled', endpoints_us_suc.updateSucursalDestino)

app.get('/cla_ceo_sucursal/like', endpoints_sucursal.getSucursalLike)
app.get('/cla_ceo_roles', db.getRoles)

app.get('/cla_ceo_estados_leads', db.getEstadosLeads)
app.put('/cla_base_mensual', db.updateGestionBaseLead);
app.put('/cla_base_mensual_pend', db.updatePendienteBaseLead);

app.get('/cla_ceo_tam_personas', endpoints_tam.getAll);
app.get('/cla_ceo_tam/like', endpoints_tam.getRutLike);
app.get('/cla_ceo_tam/colaborador', endpoints_tam.getByMailColaborador);
app.put('/cla_ceo_tam', endpoints_tam.update);
app.get('/cla_ceo_tam/estado', endpoints_tam.getEstados)
app.put('/cla_ceo_tam/descargado', endpoints_tam.updateDescargados);
/*migra grilla Leads*/
app.post('/cla_ceo_leads/colaborador', db.getLeadsColaborador);
app.post('/cla_ceo_leads/colaborador_propenso', db.getLeadsPropensosColaborador);
app.get('/cla_ceo_leads', db.getLeadById);
app.get('/regiones', db.getRegiones);
app.get('/cla_campanas_usuario', db.getCampanasByColaborador);
app.get('/cla_campanas_supervisor', db.getCampanasBySupervisor);
app.put('/cla_ceo_lead_pend', db.updatePendienteLead);
app.put('/cla_ceo_lead', db.updateLead);
app.post('/cla_ceo_leads/colaborador_all', db.getAllLeadsColaborador);
app.post('/cla_ceo_leads/colaborador_resumen', db.getResumenLeadsColaborador);
app.get('/cla_ceo_leads/colaborador_top', db.getTop11LeadsColaborador);
app.get('/cla_ceo_leads/ejecutivos_campana', db.getAllEjecutivosCampana);
app.put('/cla_ceo_lead/ejecutivo_assign', db.updateEjecutivoLead);
app.get('/cla_ceo_lead/total', db.getLeads_total);
app.get('/cla_ceo_vista/cantidad', db.getVistaUsuario);



app.post("/apiFlow/create_order", db.create_order);

app.post("/apiFlow/payment_confirm", db.payment_confirm);

app.post("/apiFlow/result", db.api_result);

app.post("/apiFlow/create_email", db.create_email);

app.get('/planes/:isapre/:tipo', db.getPlanes);
app.get('/cla_bancos', db.getBancos);
app.post('/cla_cotizacion', db.insertCotiza);

app.get('/cambiate_leads/banco', endpoints_cambiate.getLeadByBanco);
app.put('/cambiate_leads/asigna', endpoints_cambiate.updateAsignLeads);

app.get('/cambiate/creditos', endpoints_cb_creditos.getCreditosByRut);
app.put('/cambiate/creditos', endpoints_cb_creditos.updateCreditos);

app.get('/cambiate/conf_oferta', endpoints_cb_creditos.getConfiguradorOferta);
app.get('/cambiate/tramo_precio', endpoints_cb_creditos.getTramoPrecio);
app.post('/cambiate/success', endpoints_cb_creditos.getStatus);


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

exports.apifenix = functions.https.onRequest(app);