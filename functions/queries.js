require('dotenv').config();
const FlowApi = require("flow-pago");
const queries_ficha = require('./query_string/query_string_ficha')
const queries_usuario = require('./query_string/cla_scanner_usuarios');
const queries_campana = require('./query_string/query_string_campana')
const queries_us_suc = require('./query_string/usuario_sucursal')
const queries_leads_usuarios = require('./query_string/leads_usuarios')
const query_suc = require('./query_string/sucursal')
const queries_rol = require('./query_string/roles');
const queries_leads = require('./query_string/cla_ceo_leads');
const conn = require('./conn');
const config = require('./config.json');
const queries_micartera = require('./query_string/cla_ceo_micartera');
const queries_vista_usuario = require('./query_string/cla_ceo_vista_cartera');
const { validationResult } = require('express-validator');



const ROL_AGENTE = 2;
const ROL_SOCIO = 1;


const getEMpresa = (request, response) => {
    const id = parseInt(request.params.id);
    let query = 'SELECT * FROM bd_analitica."cla_ceo_empresas" WHERE rut_empresa = $1'
    return conn.executeQuery(query, [id]).then(result => {
        return response.status(200).json(result.rows)
    }).catch(error => {
        console.error(error)
        return response.status(500).send(error)
    })
};

const getEMpresaCreditoDetalle = (request, response) => {
    const id = parseInt(request.params.id);
    let query = 'SELECT * FROM bd_analitica."cla_ceo_credito_detalle_emp" WHERE rut_empresa = $1'
    return conn.executeQuery(query, [id]).then(result => {
        return response.status(200).json(result.rows)
    }).catch(error => {
        throw error;
    })
};

const getEMpresaAhorroDetalle = (request, response) => {
    const id = parseInt(request.params.id);
    let query = 'SELECT * FROM bd_analitica."cla_ceo_ahorro_detalle_emp" WHERE rut_empresa = $1'
    return conn.executeQuery(query, [id]).then(
        result => { return response.status(200).json(result.rows) }
    ).catch(error => {
        throw error;
    })
};

const getEMpresaBeneficios = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_beneficios_emp" WHERE rut_empresa = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getEMpresaOfertas = (request, response) => {
    const id = parseInt(request.params.id);
    const categoria = request.params.categoria;

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_oferta_emp" WHERE rut_empresa = $1 and categoria = $2', [id, categoria])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })


};

const getAfiliados = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_afiliados" WHERE rut_persona = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadoEmpresa = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_afiliado_empresa" WHERE rut_persona = $1 limit 3', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadosbot = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT rut_persona FROM bd_analitica."cla_ceo_afiliados" WHERE rut_persona = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadosMora = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_oferta_mora_af" WHERE rut_cliente = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadosAprobadoPrecal = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_oferta_aprobados_af" WHERE rut_persona = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadosCampanaAutoTotal = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_oferta_auto_full_af" WHERE rut_persona = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadosOfertaEfi = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_oferta_efi_af" WHERE rut_persona = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadosRecomendacionSeguro = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_oferta_seguros_af" WHERE rut_persona = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadosOfertasAhorro = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_oferta_ahorro_af" WHERE rut_persona = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getAfiliadosOfertasBbss = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery('SELECT * FROM bd_analitica."cla_ceo_oferta_bbss_af" WHERE rut_persona = $1', [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

//servicios para mapa
const getColaboradoresRegion = (request, response) => {
    const id = request.params.id;
    if (id === '0') {
        conn.executeQuery(`select region, lat_region lat, long_region lng, count(1) as n 
        from bd_analitica."cla_ceo_mapa_colaboradores" 
        group by region, lat_region, long_region 
        order by 4 desc`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    } else {
        conn.executeQuery(`select region, comuna, lat_com lat, long_com lng, count(1) as n 
        from bd_analitica."cla_ceo_mapa_colaboradores" 
        where region = $1
        group by region, comuna, lat_com, long_com
         order by 5 desc`, [id])
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    }

};


const getColaboradoresPosicion = (request, response) => {
    const id = request.params.id;
    if (id === '0') {
        conn.executeQuery(`SELECT lat_com latitud, long_com longitud, nombres
        FROM bd_analitica.cla_ceo_mapa_colaboradores`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    } else {
        response.status(200).json(results.rows);

    }

};

const getColaboradoresComuna = (request, response) => {
    const id = request.params.id;
    if (id === '0') {
        conn.executeQuery(`select comuna, lat_region, long_region, count(1) as n 
        from bd_analitica."cla_ceo_mapa_colaboradores" 
        group by comuna, lat_region, long_region 
        order by 4 desc`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    } else {
        conn.executeQuery(`select region, comuna, lat_com, long_com, count(1) as n 
        from bd_analitica."cla_ceo_mapa_colaboradores" 
        where region = $1
        group by region, comuna, lat_com, long_com
         order by 5 desc`, [id])
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    }

};

const getAfiliadosRegion = (request, response) => {
    const id = request.params.id;
    if (id === '0') {
        conn.executeQuery(`
        select region, lat_region lat, long_region lng, sum(afiliados) as n
        from bd_analitica."cla_ceo_scorecard_resumen"
        group by region, lat_region, long_region
        order by 4 desc`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    } else {
        conn.executeQuery(`
        select region, comuna, lat_comuna lat , long_comuna lng, sum(afiliados) as n
        from bd_analitica."cla_ceo_scorecard_resumen"
        where region = $1
        group by region, comuna, lat_comuna, long_comuna
        order by 5 desc`, [id])
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    }

};


const getAfiliadosComuna = (request, response) => {
    const id = request.params.id;
    if (id === '0') {
        conn.executeQuery(`select comuna, lat_comuna lat, long_comuna lng, sum(afiliados) as n
        from bd_analitica."cla_ceo_scorecard_resumen"
        group by comuna, lat_comuna, long_comuna
        order by 4 desc`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    } else {
        conn.executeQuery(`select comuna, lat_comuna lat, long_comuna lng, sum(afiliados) as n
        from bd_analitica."cla_ceo_scorecard_resumen" 
        where region = $1
        group by comuna, lat_comuna, long_comuna
        order by 4 desc`, [id])
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    }
};

const getVulnerabilidadRegion = (request, response) => {
    const id = request.params.id;
    if (id === '0') {
        conn.executeQuery(`
        select sigla_tramo as "name", sum(afiliados) as data
        from bd_analitica."cla_ceo_scorecard_resumen"
        group by sigla_tramo
        order by 2 desc`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    } else {
        conn.executeQuery(`
        select region, sigla_tramo as "name", sum(afiliados) as data
        from bd_analitica."cla_ceo_scorecard_resumen"
        where region = $1
        group by region, sigla_tramo
        order by 3 desc`, [id])
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })

    }
};

const getVulnerabilidadComuna = (request, response) => {
    const id = request.params.id;
    conn.executeQuery(`
    select comuna, sigla_tramo as "name", sum(afiliados) as data
    from bd_analitica."cla_ceo_scorecard_resumen"
    where comuna = $1
    group by comuna, sigla_tramo
    order by 3 desc`, [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getVulnerabilidadComunaColaborador = (request, response) => {
    const id = request.params.id;
    if (id === '0') {
        conn.executeQuery(`
        select sigla_tramo as "name", count(1) as data
        from bd_analitica."cla_ceo_mapa_colaboradores"
        group by sigla_tramo
        order by 2 desc`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })

    } else {
        conn.executeQuery(`
        select comuna, sigla_tramo as "name", count(1) as data
        from bd_analitica."cla_ceo_mapa_colaboradores"
        where comuna = $1
        group by comuna, sigla_tramo
        order by 3 desc`, [id])
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    }
};

const getComunaPos = (request, response) => {
    const id = request.params.id;
    conn.executeQuery(`
    select distinct comuna, lat_comuna as lat, long_comuna as lng
    from bd_analitica."cla_ceo_scorecard_resumen"
    where comuna = $1`, [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getVulnerabilidadRegionColaborador = (request, response) => {
    const id = request.params.id;
    conn.executeQuery(`
    select region, sigla_tramo as "name", count(1) as data
    from bd_analitica."cla_ceo_mapa_colaboradores"
    where region = $1
    group by region, sigla_tramo
    order by 3 desc`, [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getContagiosCovid = (request, response) => {
    const id = request.params.id;
    if (id === 'region') {
        conn.executeQuery(`
        select distinct region, lat_region, long_region,  contagios_reg
        from  
        bd_analitica.cla_ceo_contagios_covid
        order by contagios_reg desc`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })

    } else {

        conn.executeQuery(`
        select comuna, latitud, longitud, contagios_com 
        from  
        bd_analitica."cla_ceo_contagios_covid"
        order by contagios_com desc`)
            .then(
                result => { return response.status(200).json(result.rows) }
            ).catch(error => {
                console.error(error)
                return response.status(500).send(error)
            })
    }
};

const getFarmaciasOperativas = (request, response) => {
    conn.executeQuery(`
    select 
local_nombre_normalizado as local,  
local_direccion, 
local_telefono, 
local_lat,
local_lng
from bd_analitica."cla_ceo_farmacias_chile" 
where local_nombre_normalizado IN ('CRUZ VERDE', 'AHUMADA', 'SALCOBRAND') and 
(local_lat is not null or local_lng is not null)`)
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
};

const getDiferimientos = (request, response) => {
    // FORMATO DE  Q = MM-DD-YYYY
    var q = request.query.q;
    var date;
    if (typeof q !== 'undefined') {
        try {
            date = getDate(new Date(q))
        } catch (error) {
            throw error;
        }
    } else {
        date = getDate();
    }

    conn.executeQuery(`SELECT "fecha_resolucion", 
        "rut_afiliado", "correo_afiliado" FROM bd_analitica."cla_ceo_diferimiento"
        WHERE "fecha_resolucion" = $1`, [date])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}


const getOfertaCreditoDigitalEmpresa = (request, response) => {
    const id = parseInt(request.params.id);

    conn.executeQuery(`
    select rut_empresa, count(distinct rut_persona) as cantidad, sum(monto) as monto
    from bd_analitica."cla_ceo_oferta_aprobados_af" 
    where rut_empresa = $1
    and segmento_score <> 'PENSIONADO'
    and cred_digital = 1
    group by rut_empresa`, [id])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })

};

const getMailsEncuesta = (request, response) => {
    let q = request.query.offset;
    let offset = 0
    if (typeof q !== 'undefined') {
        try {
            offset = parseInt(q);
        } catch (error) {
            throw error
        }
    }

    conn.executeQuery(`select rut, email FROM bd_analitica."cla_ceo_encuesta"  order by rut limit 100 offset ${offset}`)
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}

/** OFERTAS MI-CARTERA */
const getOfertaPPFFAfiliado = (request, response) => {
    let q = request.query.id;
    if (typeof q === 'undefined') {
        throw new Error('Parametro id requerido')
    }
    query = `select rut, producto, monto, tipo, fecha_carga 
    from bd_analitica."cla_ceo_oferta_ppff" where rut = ${q} order by orden asc`

    conn.executeQuery(query)
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}

//cla_ceo_oferta_bbss
const getOfertaBbSSAfiliado = (request, response) => {
    let q = request.query.id;
    if (typeof q === 'undefined') {
        throw new Error('Parametro id requerido')
    }
    query = `select rut, oferta from bd_analitica."cla_ceo_oferta_bbss"
    where rut = ${q} order by oferta desc`
    conn.executeQuery(query)
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}

const getOfertasAlertaAfiliado = (request, response) => {
    let q = request.query.id;
    if (typeof q === 'undefined') {
        throw new Error('Parametro id requerido')
    }
    query = `select rut_persona, tipo_producto, alerta, monto, orden, script, icono 
    from bd_analitica."cla_ceo_alertas_afiliado"
    where rut_persona = ${q} order by orden asc`

    conn.executeQuery(query)
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}

const getTimeLineAfiliado = (request, response) => {
    let q = request.query.id;
    let channel = request.query.channel;
    if (typeof q === 'undefined') {
        throw new Error()
    }
    conn.executeQuery(queries_ficha.cla_ceo_timeline_afiliado(q, channel))
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}

const getCreditoMiFicha = (request, response) => {
    let q = request.query.id;
    if (typeof q === 'undefined') {
        throw new Error()
    }

    conn.executeQuery(queries_ficha.cla_ceo_stock_creditos_af(q))
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}

const getSeguroMiFicha = (request, response) => {
    let q = request.query.id;
    if (typeof q === 'undefined') {
        return response.status(400).send('Parametro id requerido.')
    }
    conn.executeQuery(queries_ficha.cla_ceo_stock_seguro_afiliado(q))
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}

const getAhorroMiFicha = (request, response) => {
    let q = request.query.id;
    if (typeof q === 'undefined') { return response.status(400).send('Parametro id requerido.') }

    conn.executeQuery(queries_ficha.cla_ceo_stock_ahorro_afiliado(q))
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })


}

const getImagenesComponente = (request, response) => {
    let q = request.query.componente;
    if (typeof q === 'undefined') { return response.status(400).send('Parametro ?componente requerido') }

    conn.executeQuery(queries_ficha.cla_ceo_imagenes_ficha(q), [q])
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}


const getAutoFullMiFicha = (request, response) => {
    let q = request.query.id;
    if (typeof q === 'undefined') {
        return response.status(400).send('Parametro id requerido.')
    }

    conn.executeQuery(queries_ficha.cla_ceo_oferta_auto_full_afiliado(q))
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })


}

const getOfertasAfiliado = (request, response) => {
    let q = request.query.id;
    let producto = request.query.producto;
    if (typeof q === 'undefined') {
        throw new Error('Parametro id requerido')
    }
    let query = `select rut_persona, tipo_producto, oferta, monto, orden, script, icono 
    from bd_analitica."cla_ceo_ofertas_afiliado" where rut_persona = ${q} order by orden asc`

    if (typeof producto !== 'undefined') {
        query = `select rut_persona, monto from bd_analitica."cla_ceo_ofertas_afiliado" 
        where rut_persona = ${q} and tipo_producto = '${producto}' order by orden asc`
    }

    conn.executeQuery(query)
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}

const getCargasFamiliaresAfiliado = (request, response) => {
    let rut_persona = request.query.id
    let periodo_sk = request.query.period
    if (typeof rut_persona === 'undefined') {
        throw new Error('Parametro id requerido')
    }
    if (periodo_sk !== null || typeof periodo_sk === 'undefined' || periodo_sk === 'null') {
        let date = new Date()
        let monthNumber = 5 //date.getMonth()
        let month = monthNumber < 10 ? '0' + monthNumber : monthNumber
        periodo_sk = `${date.getFullYear()}${month}`;
    }

    conn.executeQuery(queries_ficha.cla_cargas_familiares_afiliado(rut_persona, periodo_sk))
        .then(
            result => { return response.status(200).json(result.rows) }
        ).catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}



const insertTimelineAfiliado = (request, response) => {
    let body = request.body;
    let tipo_interaccion = getValueOrEmptyString(body.tipo_interaccion);
    let campana = getValueOrEmptyString(body.campana);
    let estado_gestion = getValueOrEmptyString(body.estado_gestion);
    values = [body.rut_persona, body.ejecutivo, body.id_operador, body.canal, body.tipo_gestion, body.comentarios, body.fechaContacto, tipo_interaccion, campana, estado_gestion]
    conn.executeQuery(queries_ficha.cla_ceo_insert_timeline_afiliado_ceo(), values, (error, result) => {
        if (error) {
            console.error(error);
            return response.status(500).send('Problema con la consulta')
        }
        return response.status(200).json(result.rows)
    })
}

const insertSimulacionEjecutivo = (request, response) => {
    body = request.body;
    values = [
        body.capital_inicial, body.cuotas,
        body.dv, body.email, body.meses_gracia,
        body.monto_proyectado, body.monto_solicitado,
        body.nombres, body.rut, body.tasa_interes, body.telefono,
        body.uf, body.ejecutivo
    ]
    return conn.executeQuery(queries_ficha.cla_ceo_simulacion_por_ejecutivo(), values)
        .then(result => {
            return response.status(200).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            throw new Error('Error al insertar simulación');
        })
}

/** Fin ofertas MI-CARTERA */

const getClaCeoUsuarios = (request, response) => {
    let cargo = request.query.cargo;
    let query = typeof cargo === "undefined" ?
        queries_usuario.getAll() :
        queries_usuario.getUsersInHierarchy()
    let values = typeof cargo === "undefined" ? [] : [cargo]

    return conn.executeQuery(query, values)
        .then(
            result => {
                return response.status(200).json(result.rows)
            })
        .catch(error => {
            console.error(error)
            throw new Error('Error al buscar usuarios')
        })
}


const updateClaRolUsuario = async(request, response) => {
    let body = request.body;
    // Quitar de sucursales donde el rol sea socio
    if (body.cargo === null) {
        await conn.executeQuery(queries_us_suc.deleteByUser(), [body.rut])
    }
    conn.executeQuery(queries_usuario.updateRolUsuario(body.id_cargo, body.rut))
        .then(_ => {
            return response.status(200).json(_.rows)
        })
        .catch(error => {
            console.error(error)
            return response.status(500).send(error)
        })
}


const updateClaCeoUsuario = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.error(errors)
        return response.status(422).json({ errors: errors.array() });
    }

    let body = request.body;
    values = [body.nombres, body.apellido_materno,
            body.apellido_paterno, body.puesto_real, body.es_ejecutivo, body.sucursal, body.nivel_acceso, body.usuario_actualiza,
            body.id_cargo, body.idbanco, body.rut
        ]
        // check if rut..
        // validaciones 
    conn.executeQuery(queries_usuario.update_usuario(), values)
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send('Algo salio mal')
        })
}


/** Inicio Queries Campana */
const getAllCampains = (request, response) => {
    let idCampain = request.query.id;
    let queryString = queries_campana.getAll()
    values = []
    if (typeof idCampain !== "undefined") {
        queryString = queries_campana.getById()
        values = [idCampain]

    }
    conn.executeQuery(queryString, values)
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send('Algo salio mal')
        })

}

const insertCampain = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array })
    }
    let body = request.body;
    values = [body.nombre, new Date(body.created_time), body.tipo]
    conn.executeQuery(queries_campana.insert(), values)
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const deleteCampain = (request, response) => {
    let id_campain = request.query.id
    conn.executeQuery(queries_campana.deleteCampain(), [id_campain])
        .then(_ => { return response.status(200).send(_.rows) })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const getCampainsByTipo = (request, response) => {
    let tipo = request.query.tipo;
    if (typeof tipo === 'undefined') { return response.status(400).send('Parametro ?tipo requerido') }

    conn.executeQuery(queries_campana.getByTipo(tipo), [tipo])
        .then(result => {
            return response.status(200).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send(err)
        })
}

const getSupervisoresByCampain = (request, response) => {
    let id = request.query.id;
    if (typeof id === 'undefined') { return response.status(400).send('Parametro ?id requerido') }

    conn.executeQuery(queries_campana.getSupervisoresByCampain(id), [id])
        .then(result => {
            return response.status(200).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send(err)
        })
}

const getBancos = (request, response) => {

    conn.executeQuery(queries_campana.getBancos())
        .then(result => {
            return response.status(200).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send(err)
        })
}


const insertCotizacion = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array })
    }
    let body = request.body;
    var arrBancos = body.bancos;
    var arrayLength = arrBancos.length;
    console.log(arrayLength);
    for (var i = 0; i < arrayLength; i++) {
        let hipoteca = 0;
        let credito = 0;
        let tarjeta = 0;

        if (body.hipoteca === true) {
            hipoteca = 1
        }

        if (body.credito === true) {
            credito = 0
        }

        if (body.tarjeta === true) {
            tarjeta = 1
        }

        let values = [body.rut, String(body.rut).substring(0, String(body.rut).length - 2), body.nombre, body.telefono,
            body.email, body.created_time, body.fecha, body.idbanco, body.deuda, body.archivo, body.timestamp, body.periodo,
            hipoteca, credito, tarjeta, arrBancos[i]
        ];


        conn.executeQuery(queries_leads.cla_ceo_insert_cotizacion(), values, (error, result) => {
            if (error) {
                console.error(error);
                return response.status(500).send('Problema con la consulta')
            }
            return response.status(200).json(result.rows)


            //Do something
        });

        //Do something
    }



    /* values = [body.rut,body.rutint, body.nombre,body.telefono,body.email,body.created_time,body.fecha, body.idbanco, body.deuda,body.archivo,body.timestamp,body.periodo,
         body.hipoteca, body.credito, body.tarjeta];
*/

}

const getColaboradoresByCampain = (request, response) => {
    let tipo = request.query.tipo;
    let idcampana = request.query.idcampana;
    let idsucursal = request.query.idsucursal;

    if (typeof idcampana === 'undefined') { return response.status(400).send('Parametro ?idcampana requerido') }

    conn.executeQuery(queries_campana.getColaboradoresByCampain(tipo, idcampana, idsucursal), [tipo, idcampana, idsucursal])
        .then(result => {
            return response.status(200).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send(err)
        })
}


const insertSupervisor = (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array })
    }
    let body = request.body;
    values = [body.idusuario, body.idcampana, body.created_time]
    conn.executeQuery(queries_campana.insertSupervisor(), values)
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const deleteSupervisor = (request, response) => {
    let id_capain = request.query.id
    conn.executeQuery(queries_campana.deleteSupervisor(), [id_capain])
        .then(_ => { return response.status(200).send(_.rows) })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const insertColaboradorCampain = (request, response) => {
    let values = request.body;

    conn.executeQuery(queries_campana.insertColaboradorCampain(values))
        .then(_ => { return response.status(200).send(_.rows) })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const deleteColaboradorCampain = (request, response) => {
    let idcampana = request.query.idcampana
    let idsucursal = request.query.idsucursal
    conn.executeQuery(queries_campana.deleteColaboradorCampain(), [idcampana, idsucursal])
        .then(_ => { return response.status(200).send(_.rows) })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const getAllSucursales = (request, response) => {
    conn.executeQuery(queries_campana.getAllSucursales())
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send('Algo salio mal')
        })
}

const insertOrUpdatePrioridad = (request, response) => {
    let body = request.body;
    values = [body.idcampana, body.idsucursal, body.prioridad, body.contador, body.created_time]
    conn.executeQuery(queries_campana.insertOrUpdatePrioridad(), values)
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const getPrioridad = (request, response) => {
    let idcampana = request.query.idcampana;
    let idsucursal = request.query.idsucursal;

    if (typeof idcampana === 'undefined') { return response.status(400).send('Parametro ?idcampana requerido') }
    conn.executeQuery(queries_campana.getPrioridad(id_campana, idsucursal), [id_campana, idsucursal])
        .then(result => {
            return response.status(200).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send(err)
        })
}

const getColaboradorByPrioridad = (request, response) => {
    let idcampana = request.query.idcampana;
    let idsucursal = request.query.idsucursal;
    let prioridad = request.query.prioridad;

    if (typeof idcampana === 'undefined') { return response.status(400).send('Parametro ?idcampana requerido') }

    conn.executeQuery(queries_campana.getColaboradorByPrioridad(idcampana, idsucursal, prioridad), [idcampana, idsucursal, prioridad])
        .then(result => {
            return response.status(200).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send(err)
        })
}



const updateCampain = (request, response) => {
    let body = request.body;
    let values = [body.nombre, body.tipo, parseInt(body.idCampana)]
    conn.executeQuery(queries_campana.updateCampain(), values)
        .then(_ => { return response.status(200).send(_.rows) })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const updatePrioridad = (request, response) => {
    let body = request.body;
    let values = [body.contador, body.idcampana, body.idsucursal]
    conn.executeQuery(queries_campana.updatePrioridad(), values)
        .then(_ => { return response.status(200).send(_.rows) })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const getSucursalById = (request, response) => {
    let idsucursal = request.query.idsucursal;

    if (typeof idsucursal === 'undefined') { return response.status(400).send('Parametro ?idsucursal requerido') }

    conn.executeQuery(queries_campana.getSucursalById(idsucursal), [idsucursal])
        .then(result => {
            return response.status(200).json(result.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send(err)
        })
}

/** Fin Queries Campana */

const getSucursalUsuario = (request, response) => {
    let idCargo = request.query.idCargo;
    let idusuario = request.query.idUsuario;
    if (typeof idCargo === 'undefined' && typeof idusuario === 'undefined') {
        return response.status(400).send('Parametro ?idCargo requerido')
    }

    let query = queries_us_suc.getSucursalesDisponiblesPorCargo()
    if (typeof idusuario !== 'undefined') {
        query = queries_us_suc.getSucursalesUsuario()
    }
    let param = typeof idCargo !== 'undefined' ? idCargo : idusuario;

    conn.executeQuery(query, [param])
        .then(_ => {
            return response.status(200).send(_.rows)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const getSucursales = (request, response) => {
    conn.executeQuery(query_suc.getAll()).then(_ => {
            return response.status(200).send(_.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send('Algo salio mal')
        })
}
const getSucursalDisponible = (request, response) => {
    conn.executeQuery(query_suc.getDisponible())
        .then(_ => {
            return response.status(200).send(_.rows)
        }).catch(error => {
            return response.status(500).send('Algo salio mal')
        })
}


const deleteUsuarioSucursal = (request, response) => {
    let rut_persona = request.query.id;
    conn.executeQuery(queries_us_suc.deleteByUser(), [rut_persona])
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error)
            return response.status(500).send('Algo salio mal')
        })
}

const addUsuarioSucursal = (request, response) => {
    let values = request.body;

    conn.executeQuery(queries_us_suc.add(values)).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}


const getSucursalesByRutUsuario = (request, response) => {
    let idusuario = request.query.idusuario;
    conn.executeQuery(queries_us_suc.getSucursalesByRutUsuario(), [idusuario])
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const updateColaboradorCampain = async(request, response) => {
    let body = request.body;
    let values1 = [body.idusuarioNew, body.idusuario, body.idcampana, body.idsucursal]
    let values2 = [body.idusuarioNew, body.email, body.idusuario, body.idcampana, body.idsucursal]
    try {
        if (body) {
            const resultUserCampaing = await conn.executeQuery(queries_campana.updateUsuarioCampana(), values1)

            const resultUserLeads = await coon.executeQuery(queries_campana.updateLeadsByColaborador(), values2)

            return response.status(200).send({ message: 'Ok!' })
        }
    } catch (error) {
        console.log(error)
        return response.status(500).send('error')
    }
}


const getLeadsByColaboradores = (request, response) => {
    let values = request.body;

    conn.executeQuery(queries_leads_usuarios.getLeadsByColaboradores(values.campana, values.sucursal, values.data)).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const updateAsignLeads = (request, response) => {
    let values = request.body;

    conn.executeQuery(queries_leads_usuarios.updateAsignLeads(values.idsucursal, values.idusuario, values.emailusuario, values.value)).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const getLeadsBySucursal = (request, response) => {
    let sucursal = request.query.sucursal;
    let campana = request.query.campana;

    conn.executeQuery(queries_leads_usuarios.getLeadsBySucursal(sucursal, campana), [sucursal, campana]).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const getAgentesSinSucursal = (request, response) => {
    conn.executeQuery(queries_us_suc.getAgentesSinSucursal()).then(result => { return response.status(200).send(result.rows) })
        .catch(error => { console.error(error); return response.status(500).send(error) })
}

const setAgenteSucursal = async(request, response) => {
    let values = [request.body.agente, request.body.idsucursal, new Date()]
    try {
        await conn.executeQuery(queries_us_suc.deleteAgenteSucursal(), [values[1]])
        await conn.executeQuery(queries_us_suc.add([values]))
        return response.status(200).send()
    } catch (error) {
        console.log(error);
        return response.status(500).send('Algo salio mal')
    }
}

const getUsuariosPorCargoSuc = (request, response) => {
    let idsuc = request.query.id;
    let cargo = request.query.cargo;
    conn.executeQuery(queries_us_suc.getUsuariosPorCargoSuc(), [cargo, idsuc]).then(_ => {
        return response.status(200).send(_.rows)
    }).catch(
        error => { console.error(error); return response.status(500).send('Algo salio mal') })
}

const getDotaciones = async(request, response) => {
    let idsuc = request.query.id;
    let idusuer = request.query.rut;
    try {
        const disponibles = await conn.executeQuery(queries_us_suc.getDotacionDisponible())
        let dotacion = [];
        if (idsuc !== 'null') {
            const result = await conn.executeQuery(queries_us_suc.getDotacionSucursalAgente(), [idusuer, idsuc])
            dotacion = result.rows
        }

        data = { "disponibles": disponibles.rows, "dotacion": dotacion }
        return response.status(200).send(data)
    } catch (error) {
        console.error(error)
        return response.status(500).send('Algo salio mal')
    }
}



const updateDotaciones = async(request, response) => {
    let values = request.body.bulk;
    let idsuc = request.body.id;
    try {
        if (values) {
            let ids = values.map(a => a[0]);
            const resultDelete = await conn.executeQuery(queries_us_suc.deleteDotacion(idsuc))
            if (values.length > 0) {
                const resultInsert = await conn.executeQuery(queries_us_suc.insertDotacion(values, idsuc))

            }

            return response.status(200).send({ message: 'Ok!' })
        }
    } catch (error) {
        console.log(error)
        return response.status(500).send('Hola')
    }
}

const getRoles = (request, response) => {
    conn.executeQuery(queries_rol.getAll()).then(_ => {
            return response.status(200).send(_.rows)
        })
        .catch(err => {
            console.error(err);
            return response.status(500).send('Algo salio mal')
        })
}



const getMicarteraCreditos = (request, response) => {
    let rut = parseInt(request.query.rut);
    let idcargo = parseInt(request.query.idcargo);
    try {
        if (idcargo === 2 || idcargo === 1) {
            conn.executeQuery(queries_micartera.getMicarteraCreditosSocioOrAgente(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        } else {
            conn.executeQuery(queries_micartera.getMicarteraCreditosColaborador(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        }

    } catch (error) {
        return response.status(500).send('Error')
    }
}


const getMicarteraCreditosGestionado = (request, response) => {
    let rut = parseInt(request.query.rut);
    let idcargo = parseInt(request.query.idcargo);
    try {
        if (idcargo === 2 || idcargo === 1) {
            conn.executeQuery(queries_micartera.getMicarteraCreditosGestionadoSocioOrAgente(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        } else {
            conn.executeQuery(queries_micartera.getMicarteraCreditosGestionado(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        }

    } catch (error) {
        return response.status(500).send('Error')
    }
}


const getMicarteraCreditosPendientes = (request, response) => {
    let rut = parseInt(request.query.rut);
    let idcargo = parseInt(request.query.idcargo);
    try {
        if (idcargo === 2 || idcargo === 1) {
            conn.executeQuery(queries_micartera.getMicarteraCreditosPendientesSocioOrAgente(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        } else {
            conn.executeQuery(queries_micartera.getMicarteraCreditosPendientes(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        }

    } catch (error) {
        return response.status(500).send('Error')
    }
}



const getMicarteraCreditos_total = (request, response) => {
    let rut = parseInt(request.query.rut);
    let idcargo = parseInt(request.query.idcargo);
    try {
        if (idcargo === 2 || idcargo === 1) {
            conn.executeQuery(queries_micartera.getMicarteraCreditos_totalSocioOrAgente(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        } else {
            conn.executeQuery(queries_micartera.getMicarteraCreditos_total(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        }
    } catch (error) {
        return response.status(500).send('Error')
    }
}

const getMicartera_ejecutivos = (request, response) => {
    let rut = parseInt(request.query.rut);
    let idcargo = parseInt(request.query.idcargo);
    try {
        if (idcargo === 2 || idcargo === 1) {
            conn.executeQuery(queries_micartera.getMicartera_ejecutivos(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        } else {
            conn.executeQuery(queries_micartera.getMicartera_ejecutivos(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        }
    } catch (error) {
        return response.status(500).send('Error')
    }
}
const getDiasRestantes = (request, response) => {
    conn.executeQuery(`
        SELECT count(*) n_dias FROM bd_analitica.cla_ceo_fecha
        where mes=EXTRACT(MONTH FROM NOW()) and dia_rep>=EXTRACT(DAY FROM NOW()) and festivo='N'`).
    then(result => {
        return response.status(200).json(result.rows);
    }).catch(error => { return response.status(500).send(error) })
}

const getEstadosLeads = (request, response) => {

    conn.executeQuery(queries_ficha.cla_ceo_estados_leads()).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const updateGestionBaseLead = (request, response) => {
    let values = request.body;

    conn.executeQuery(queries_ficha.updateGestionBaseLead(values.fecha_date_gestion, values.periodo_gestion, values.fecha_gestion, values.rut_persona, values.id_estado, values.monto_cursado, values.observaciones)).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const updatePendienteBaseLead = (request, response) => {
    let values = request.body;
    conn.executeQuery(queries_ficha.updatePendienteBaseLead(values.fecha_date_gestion, values.periodo_gestion, values.fecha_gestion, values.rut_persona)).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const getCreditosMiCarteraEstado = (request, response) => {
    let id = request.query.id;
    let status = request.query.status;
    conn.executeQuery(`select * from "bd_analitica".cla_ceo_micartera_campanas where nuevo =${status}  and rut_colaborador =${id} and activo = 1`, [values]).
    then(result => {
        return response.status(200).json(results.rows);
    }).catch(error => {
        return response.status(500).send(error)
    })
}

const getLeadsColaborador = (request, response) => {
    let values = request.body;
    try {
        if (values) {
            if (values.idcargo === 4) {
                conn.executeQuery(queries_leads.getLeadsSupervisor(values.rut_colaborador, values.nuevo, values.gestionado, values.fechaInicio, values.fechaFin)).then(result => {
                    return response.status(200).send(result.rows)
                }).catch(error => { throw error })
            } else {
                conn.executeQuery(queries_leads.getLeadsColaborador(values.rut_colaborador, values.nuevo, values.gestionado, values.fechaInicio, values.fechaFin)).then(result => {
                    return response.status(200).send(result.rows)
                }).catch(error => { throw error })
            }
        }
    } catch (error) {
        console.log(error)
        return response.status(500).send('Error')
    }
}



const getLeadsPropensosColaborador = (request, response) => {
    let values = request.body;

    try {
        if (values) {
            if (values.idcargo === 4) {
                conn.executeQuery(queries_leads.getLeadsPropensosSupervisor(values.rut_colaborador, values.fechaInicio, values.fechaFin)).then(result => {
                    return response.status(200).send(result.rows)
                }).catch(error => { throw error })
            } else {
                conn.executeQuery(queries_leads.getLeadsPropensosColaborador(values.rut_colaborador, values.fechaInicio, values.fechaFin)).then(result => {
                    return response.status(200).send(result.rows)
                }).catch(error => { throw error })
            }
        }
    } catch (error) {
        console.log(error)
        return response.status(500).send('Error')
    }
}

const getLeadById = (request, response) => {
    let id = request.query.id;
    conn.executeQuery(queries_leads.getLeadById(), [id]).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}


const getRegiones = (request, response) => {
    conn.executeQuery(queries_leads.getRegiones()).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const getCampanasByColaborador = (request, response) => {
    let rut = request.query.rut;
    conn.executeQuery(queries_campana.getCampanasByColaborador(), [rut]).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const updatePendienteLead = (request, response) => {
    let values = request.body;
    conn.executeQuery(queries_leads.updatePendienteLead(values.fecha_gestion, values.id)).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const updateLead = (request, response) => {
    let values = request.body;

    conn.executeQuery(queries_leads.updateLead(), [values.id_estado,
            values.email,
            values.nombre,
            values.phone_number,
            values.rut,
            values.observaciones,
            values.nuevo,
            values.gestionado,
            values.rut_colaborador,
            values.comuna,
            values.email_colaborador,
            values.fecha_gestion,
            values.monto_cursado,
            values.id_region,
            values.id
        ])
        .then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const getAllLeadsColaborador = (request, response) => {
    let values = request.body;

    try {
        if (values) {
            if (values.idcargo === 4) {
                conn.executeQuery(queries_leads.getAllLeadsBySupervisor(values.rut_colaborador, values.fechaInicio, values.fechaFin)).then(result => {
                    return response.status(200).send(result.rows)
                }).catch(error => { throw error })
            } else {
                conn.executeQuery(queries_leads.getAllLeadsColaborador(values.rut_colaborador, values.fechaInicio, values.fechaFin)).then(result => {
                    return response.status(200).send(result.rows)
                }).catch(error => { throw error })
            }
        }
    } catch (error) {
        console.log(error)
        return response.status(500).send('Error')
    }

}

const getResumenLeadsColaborador = (request, response) => {
    let values = request.body;
    try {
        if (values) {
            if (values.idcargo === 4) {
                conn.executeQuery(queries_leads.getResumenLeadsSupervisor(values.rut_colaborador, values.fechaInicio, values.fechaFin)).then(result => {
                    return response.status(200).send(result.rows)
                }).catch(error => { throw error })
            } else {
                conn.executeQuery(queries_leads.getResumenLeadsColaborador(values.rut_colaborador, values.fechaInicio, values.fechaFin)).then(result => {
                    return response.status(200).send(result.rows)
                }).catch(error => { throw error })
            }
        }
    } catch (error) {
        console.log(error)
        return response.status(500).send('Error')
    }
}

const getTop11LeadsColaborador = (request, response) => {
    let rut = parseInt(request.query.rut);
    let idcargo = parseInt(request.query.idcargo);
    try {
        if (idcargo === 4) {
            conn.executeQuery(queries_leads.getTop11Supervisor(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => {
                throw error
            })
        } else {
            conn.executeQuery(queries_leads.getTop11LeadsColaborador(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        }
    } catch (error) {
        return response.status(500).send('Error')
    }
}

const getAllEjecutivosCampana = (request, response) => {

    conn.executeQuery(queries_leads.getAllEjecutivosCampana()).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            return response.status(500).send('Algo salio mal')
        })
}

const updateEjecutivoLead = (request, response) => {
    let body = request.body;
    let values = [body.rut, body.email, body.id]

    conn.executeQuery(queries_leads.updateEjecutivoLead(), values)
        .then(_ => { return response.status(200).send(_.rows) })
        .catch(err => {
            console.error(err)
            return response.status(500).send('Algo salio mal')
        })
}

const getCampanasBySupervisor = (request, response) => {
    let rut = request.query.rut;
    conn.executeQuery(queries_campana.getCampanasBySupervisor(), [rut]).then(result => {
            return response.status(200).send(result.rows)
        })
        .catch(error => {
            console.error(error);
            return response.status(500).send('Algo salio mal')
        })
}

const getVistaUsuario = (request, response) => {
    let idCargo = parseInt(request.query.idcargo);
    let rut = parseInt(request.query.rut);
    try {
        let query = queries_vista_usuario.getVistaColaborador();
        if (idCargo === 1 || idCargo === 2) {
            query = queries_vista_usuario.getVistaCarteraSocioOrAgente();
        }
        if (idCargo === 4) {
            query = queries_vista_usuario.getVistaLeadsSupervisor();
        }
        conn.executeQuery(query, [rut]).then(result => {
            return response.status(200).send(result.rows);
        }).catch(error => { throw Error(error) })

    } catch (erro) {
        return response.status(500).send('Error')
    }
}

const getLeads_total = (request, response) => {
    let rut = parseInt(request.query.rut);
    let idcargo = parseInt(request.query.idcargo);
    try {
        if (idcargo === 4) {
            conn.executeQuery(queries_leads.getLeadsSupervisor_total(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        } else {
            conn.executeQuery(queries_leads.getLeads_total(), [rut]).then(result => {
                return response.status(200).send(result.rows)
            }).catch(error => { throw error })
        }

    } catch (error) {
        return response.status(500).send('Error')
    }
}

const create_order = async(req, res) => {

    try {
        const optional = {
            rut: "9999999-9",
            otroDato: "otroDato"
        };
        // Prepara el arreglo de datos
        const params = {
            commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
            subject: "Pago de prueba",
            currency: "CLP",
            amount: 5000,
            email: "efuentealba@json.cl",
            paymentMethod: 9,
            urlConfirmation: config.baseURL_api + "/payment_confirm",
            urlReturn: config.baseURL_crm + "/success",
            optional: optional

        };
        // Define el metodo a usar
        const serviceName = "payment/create";
        // Instancia la clase FlowApi
        const flowApi = new FlowApi(config);

        console.log(params);
        // Ejecuta el servicio

        let response = await flowApi.send(serviceName, params, "POST");

        //Prepara url para redireccionar el browser del pagador
        redirect = response.url + "?token=" + response.token;
        res.json({
            redirect
        });
    } catch (error) {
        res.json({ error: error.message });
    }
}

const payment_confirm = async(req, res) => {
    try {
        let params = {
            token: req.body.token
        };
        let serviceName = "payment/getStatus";
        const flowApi = new FlowApi(config);
        let response = await flowApi.send(serviceName, params, "GET");
        //Actualiza los datos en su sistema
        console.log(response);
        res.json(response);
    } catch (error) {
        res.json({ error });
    }
}

const api_result = async(req, res) => {
    try {
        let params = {
            token: req.body.token
        };
        let serviceName = "payment/getStatus";
        const flowApi = new FlowApi(config);
        let response = await flowApi.send(serviceName, params, "GET");
        //Actualiza los datos en su sistema
        console.log(response);
        res.json(response);
    } catch (error) {
        res.json({ error });
    }
}

const create_email = async(req, res) => {

    //Prepara los parámetros
    const params = {
        commerceOrder: Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
        subject: "pago prueba cobro Email",
        currency: "CLP",
        amount: 2000,
        email: "efuentealba@json.cl",
        paymentMethod: 9,
        urlConfirmation: config.baseURL + "/payment_confirm",
        urlReturn: config.baseURL + "/result",
        forward_days_after: 1,
        forward_times: 2
    };
    const serviceName = "payment/createEmail";
    try {
        const flowApi = new FlowApi(config);

        let response = await flowApi.send(serviceName, params, "POST");

        res.json({
            response
        });
    } catch (error) {
        console.log(error);
        res.json({ error: error });
    }
}


const getPlanes = (request, response) => {
    const isapre = request.params.isapre.toString();
    const tipo = request.params.tipo.toString();
    let where = '';



    if (isapre.toString() !== '0') {
        if (where === '') where = 'where ';
        where += ` codigoprestador in ('${isapre.toString()}')`;
    }

    if (tipo.toString() !== '0') {

        var a = tipo.split(",");
        tipos = '';
        for (let i = 0; i < a.length; i++) tipos += `'${a[i]}',`;
        tipos = tipos.substr(0, tipos.length - 1);
        if (where === '') {
            where = 'where ';
        } else {
            where += ' and ';
        }
        where += ` modalidadplan in (${tipos.toString()})`;
    }

    const sql = `select * from  bd_analitica.cla_ceo_planes ${where} limit 10`;
    console.log(sql);
    return conn.executeQuery(sql).then(result => {
        return response.status(200).json(result.rows)
    }).catch(error => {
        console.error(error)
        return response.status(500).send(error)
    })

};




module.exports = {
    getCreditosMiCarteraEstado,
    getEMpresa,
    getEMpresaCreditoDetalle,
    getEMpresaAhorroDetalle,
    getEMpresaBeneficios,
    getEMpresaOfertas,
    getAfiliados,
    getAfiliadoEmpresa,
    getAfiliadosbot,
    getAfiliadosMora,
    getAfiliadosAprobadoPrecal,
    getAfiliadosCampanaAutoTotal,
    getCargasFamiliaresAfiliado,
    getAfiliadosOfertaEfi,
    getAfiliadosRecomendacionSeguro,
    getAfiliadosOfertasAhorro,
    getAfiliadosOfertasBbss,
    getColaboradoresRegion,
    getColaboradoresComuna,
    getAfiliadosRegion,
    getAfiliadosComuna,
    insertTimelineAfiliado,
    insertSimulacionEjecutivo,
    getVulnerabilidadRegion,
    getVulnerabilidadComuna,
    getColaboradoresPosicion,
    getVulnerabilidadComunaColaborador,
    getComunaPos,
    getVulnerabilidadRegionColaborador,
    getContagiosCovid,
    getFarmaciasOperativas,
    getOfertaCreditoDigitalEmpresa,
    getDiferimientos,
    getMailsEncuesta,
    getOfertaPPFFAfiliado,
    getOfertaBbSSAfiliado,
    getOfertasAlertaAfiliado,
    getTimeLineAfiliado,
    getCreditoMiFicha,
    getSeguroMiFicha,
    getAhorroMiFicha,
    getImagenesComponente,
    getAutoFullMiFicha,
    getOfertasAfiliado,
    getClaCeoUsuarios,
    updateClaCeoUsuario,
    getAllCampains,
    insertCampain,
    deleteCampain,
    getCampainsByTipo,
    getSupervisoresByCampain,
    getColaboradoresByCampain,
    insertSupervisor,
    deleteSupervisor,
    insertColaboradorCampain,
    deleteColaboradorCampain,
    getAllSucursales,
    insertOrUpdatePrioridad,
    getPrioridad,
    getColaboradorByPrioridad,
    updateCampain,
    updatePrioridad,
    getSucursalById,
    getSucursalUsuario,
    updateClaRolUsuario,
    deleteUsuarioSucursal,
    addUsuarioSucursal,
    getSucursalesByRutUsuario,
    updateColaboradorCampain,
    getLeadsByColaboradores,
    updateAsignLeads,
    getLeadsBySucursal,
    getSucursales,
    getSucursalDisponible,
    getAgentesSinSucursal,
    setAgenteSucursal,
    getUsuariosPorCargoSuc,
    getDotaciones,
    updateDotaciones,
    getRoles,
    getMicarteraCreditos,
    getMicarteraCreditosGestionado,
    getMicarteraCreditos_total,
    getMicartera_ejecutivos,
    getDiasRestantes,
    getEstadosLeads,
    updateGestionBaseLead,
    getMicarteraCreditosPendientes,
    updatePendienteBaseLead,
    getLeadsColaborador,
    getLeadsPropensosColaborador,
    getLeadById,
    getRegiones,
    getCampanasByColaborador,
    updatePendienteLead,
    updateLead,
    getAllLeadsColaborador,
    getResumenLeadsColaborador,
    getTop11LeadsColaborador,
    getAllEjecutivosCampana,
    updateEjecutivoLead,
    getCampanasBySupervisor,
    getVistaUsuario,
    getLeads_total,
    create_order,
    payment_confirm,
    api_result,
    create_email,
    getPlanes,
    getBancos,
    insertCotizacion
};

function getDate(date) {
    if (typeof date === 'undefined') {
        date = new Date();
        date = date.setDate(date.getDate() - 1);
        date = new Date(date);
    }

    var today = date
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd
    return today;
}


function getValueOrEmptyString(param) {
    return typeof param === 'undefined' ?
        '' :
        param;
}