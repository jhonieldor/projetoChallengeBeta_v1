package com.eits.challenge.domain.entity;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject(javascript = "TipoPerfil")
public enum TipoPerfil {

	ADMINISTRADOR, USUARIO;

}
